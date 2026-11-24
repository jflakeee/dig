import { DIG_4D_SAVE_KEY } from './saveNamespace';
import { chunkKey, DIG_VOXELS_PER_AXIS, type ChunkCoordinate } from './chunkCoordinates';

export const DIG_CHUNK_RECORD_VERSION = 1;
export const DIG_CHUNK_VOXEL_COUNT = DIG_VOXELS_PER_AXIS ** 3;

export type ExposedResourceId = string;
export type ChunkRecord = Readonly<{
  version: 1;
  epoch: number;
  removedVoxels: readonly number[];
  exposedResources: Readonly<Record<string, ExposedResourceId>>;
}>;

export type KeyValueStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function emptyChunkRecord(epoch = 0): ChunkRecord {
  assertEpoch(epoch);
  return { version: DIG_CHUNK_RECORD_VERSION, epoch, removedVoxels: [], exposedResources: {} };
}

export function voxelId(x: number, y: number, z: number): number {
  const n = DIG_VOXELS_PER_AXIS;
  if (![x, y, z].every(Number.isInteger) || x < 0 || y < 0 || z < 0 || x >= n || y >= n || z >= n) {
    throw new Error('Local voxel coordinates are outside the chunk');
  }
  return (y * n + z) * n + x;
}

export function chunkStorageKey(coordinate: ChunkCoordinate): string {
  return `${DIG_4D_SAVE_KEY}:chunk:${chunkKey(coordinate)}`;
}

export function loadChunkRecord(storage: KeyValueStorage, coordinate: ChunkCoordinate): ChunkRecord {
  const raw = storage.getItem(chunkStorageKey(coordinate));
  if (raw === null) return emptyChunkRecord();
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error('Chunk save is not valid JSON');
  }
  return validateChunkRecord(value);
}

export function saveChunkRecord(
  storage: KeyValueStorage,
  coordinate: ChunkCoordinate,
  record: ChunkRecord,
): void {
  const valid = validateChunkRecord(record);
  storage.setItem(chunkStorageKey(coordinate), JSON.stringify(valid));
}

export function resetChunkRecord(
  storage: KeyValueStorage,
  coordinate: ChunkCoordinate,
): ChunkRecord {
  const previous = loadChunkRecord(storage, coordinate);
  if (previous.epoch >= Number.MAX_SAFE_INTEGER) throw new Error('Chunk epoch exhausted');
  const next = emptyChunkRecord(previous.epoch + 1);
  saveChunkRecord(storage, coordinate, next);
  return next;
}

export function markVoxelRemoved(record: ChunkRecord, id: number): ChunkRecord {
  const current = validateChunkRecord(record);
  assertVoxelId(id);
  if (current.removedVoxels.includes(id)) return current;
  return {
    ...current,
    removedVoxels: [...current.removedVoxels, id].sort((a, b) => a - b),
  };
}

/** Keeps the first resource assigned to an exposed voxel within this epoch. */
export function recordExposedResource(
  record: ChunkRecord,
  id: number,
  resource: ExposedResourceId,
): ChunkRecord {
  const current = validateChunkRecord(record);
  assertVoxelId(id);
  if (!resource || resource.length > 64) throw new Error('Invalid resource identifier');
  const key = String(id);
  if (Object.hasOwn(current.exposedResources, key)) return current;
  return { ...current, exposedResources: { ...current.exposedResources, [key]: resource } };
}

export function validateChunkRecord(value: unknown): ChunkRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid chunk record');
  const candidate = value as Record<string, unknown>;
  if (candidate.version !== DIG_CHUNK_RECORD_VERSION) throw new Error('Unsupported chunk record version');
  assertEpoch(candidate.epoch);
  if (!Array.isArray(candidate.removedVoxels) ||
      !candidate.removedVoxels.every((id): id is number => Number.isSafeInteger(id) && id >= 0 && id < DIG_CHUNK_VOXEL_COUNT)) {
    throw new Error('Invalid removed voxel list');
  }
  const removed = [...new Set(candidate.removedVoxels)].sort((a, b) => a - b);
  const exposed = candidate.exposedResources;
  if (!exposed || typeof exposed !== 'object' || Array.isArray(exposed)) {
    throw new Error('Invalid exposed resource map');
  }
  const exposedResources: Record<string, string> = {};
  for (const [key, resource] of Object.entries(exposed)) {
    const id = Number(key);
    if (!Number.isSafeInteger(id) || id < 0 || id >= DIG_CHUNK_VOXEL_COUNT ||
        typeof resource !== 'string' || !resource || resource.length > 64) {
      throw new Error('Invalid exposed resource entry');
    }
    exposedResources[String(id)] = resource;
  }
  return {
    version: DIG_CHUNK_RECORD_VERSION,
    epoch: candidate.epoch as number,
    removedVoxels: removed,
    exposedResources,
  };
}

function assertEpoch(epoch: unknown): asserts epoch is number {
  if (!Number.isSafeInteger(epoch) || (epoch as number) < 0) throw new Error('Invalid chunk epoch');
}
function assertVoxelId(id: number): void {
  if (!Number.isSafeInteger(id) || id < 0 || id >= DIG_CHUNK_VOXEL_COUNT) throw new Error('Invalid voxel id');
}
