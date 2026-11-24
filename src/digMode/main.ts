import * as THREE from 'three';
import { unlockAudio } from 'plinkfx';
import { digSound } from '../audio';
import { DIG_VOXEL_SIZE_METERS, DIG_VOXELS_PER_AXIS } from './chunkCoordinates';
import { DigModeRuntime } from './runtime';
import { DigModeMobileRuntimeBinding } from './mobileRuntimeBinding';
import type { SessionMineral, VoxelCoordinate } from './sessionChunks';
import { openTrainSave } from './trainSave';
import { getReconnectMemoryDialogue } from './reconnectMemoryDialogue';

const game = document.querySelector<HTMLElement>('#game')!;
const status = document.querySelector<HTMLElement>('#status')!;
const reconnectLine = document.querySelector<HTMLElement>('#reconnect-line')!;
const upgradeButton = document.querySelector<HTMLButtonElement>('#upgrade')!;
const addDrillButton = document.querySelector<HTMLButtonElement>('#add-drill')!;

const materials: Record<SessionMineral, THREE.Material> = {
  rock: new THREE.MeshStandardMaterial({ color: 0x665d52, roughness: 0.96 }),
  coal: new THREE.MeshStandardMaterial({ color: 0x292b2e, roughness: 0.9 }),
  iron: new THREE.MeshStandardMaterial({ color: 0x8d7160, roughness: 0.82 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xd6a33d, roughness: 0.7, metalness: 0.25 }),
  rare: new THREE.MeshStandardMaterial({ color: 0x8b7bdf, roughness: 0.55, emissive: 0x261f50 }),
};

const trainSave = openTrainSave({
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
});
let enhancement = trainSave.state.equipment.drillEnhancement;
let drillCount = trainSave.state.equipment.drillCount;
const collected = new Map<SessionMineral, number>();
for (const mineral of ['rock', 'coal', 'iron', 'gold', 'rare'] as const) {
  collected.set(mineral, trainSave.state.inventory[mineral]);
}
const runtime = new DigModeRuntime(materials, { aspect: innerWidth / innerHeight });
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));

const ambient = new THREE.HemisphereLight(0xe7d6be, 0x231a15, 0.04);
runtime.scene.add(ambient);
const workLamp = new THREE.PointLight(0xffd99a, 0, 24, 2);
workLamp.position.set(0, 0.1, 0.1);
runtime.camera.add(workLamp);
const machineBody = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 20, 14),
  new THREE.MeshStandardMaterial({ color: 0x80633e, metalness: 0.55, roughness: 0.42 }),
);
machineBody.position.set(0.36, -0.34, -0.62);
const drillBit = new THREE.Mesh(
  new THREE.ConeGeometry(0.1, 0.34, 10),
  new THREE.MeshStandardMaterial({ color: 0xb8b4ac, metalness: 0.8, roughness: 0.28 }),
);
drillBit.rotation.x = -Math.PI / 2;
drillBit.position.set(0.36, -0.28, -0.92);
runtime.camera.add(machineBody, drillBit);
runtime.scene.add(runtime.camera);

// Dust motes make the opening space readable as a confined, dusty mine.
const dustGeometry = new THREE.BufferGeometry();
const dustPositions = new Float32Array(420 * 3);
for (let i = 0; i < 420; i++) {
  dustPositions[i * 3] = (Math.random() - 0.5) * 14;
  dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 22;
}
dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
const dust = new THREE.Points(
  dustGeometry,
  new THREE.PointsMaterial({ color: 0xb69a70, size: 0.045, transparent: true, opacity: 0.18, depthWrite: false }),
);
runtime.scene.add(dust);

const startChunk = { x: 0, y: 0, z: 0 };
const startVoxel = { x: 16, y: 16, z: 16 };
// Clear a small start pocket and a narrow bore in front of the spherical miner.
for (let y = 14; y <= 18; y++) {
  for (let z = 14; z <= 18; z++) {
    for (let x = 14; x <= 18; x++) {
      runtime.session.carveVoxelWithoutReward(startChunk, { x, y, z });
    }
  }
}
for (let z = 19; z < DIG_VOXELS_PER_AXIS; z++) {
  for (let y = 15; y <= 17; y++) {
    for (let x = 15; x <= 17; x++) {
      runtime.session.carveVoxelWithoutReward(startChunk, { x, y, z });
    }
  }
}

const spawn = {
  x: (startVoxel.x + 0.5) * DIG_VOXEL_SIZE_METERS,
  y: (startVoxel.y + 0.5) * DIG_VOXEL_SIZE_METERS,
  z: (startVoxel.z + 0.5) * DIG_VOXEL_SIZE_METERS,
};
runtime.camera.position.set(spawn.x, spawn.y, spawn.z);
runtime.setCameraLook(Math.PI, 0);

const binding = new DigModeMobileRuntimeBinding(runtime, game, spawn, {
  radius: 0.32,
  thrustAcceleration: 5,
  maximumSpeed: 3.5,
});
let elapsed = 0;
let lastDrillSound = 0;

function persistTrainState(): void {
  const inventory = {
    rock: collected.get('rock') ?? 0,
    coal: collected.get('coal') ?? 0,
    iron: collected.get('iron') ?? 0,
    gold: collected.get('gold') ?? 0,
    rare: collected.get('rare') ?? 0,
  };
  const result = trainSave.save({
    ...trainSave.current,
    equipment: { drillEnhancement: enhancement, drillCount },
    inventory,
  });
  if (result !== 'saved') status.textContent = result === 'conflict'
    ? '저장 충돌이 감지되었습니다.'
    : '열차 기록을 저장하지 못했습니다.';
}

upgradeButton.textContent = `드릴 강화 · Lv ${enhancement}`;
upgradeButton.disabled = enhancement >= 5;
addDrillButton.textContent = `드릴 추가 · ${drillCount}대`;
addDrillButton.disabled = drillCount >= 5;

upgradeButton.addEventListener('click', () => {
  enhancement = Math.min(5, enhancement + 1);
  upgradeButton.textContent = `드릴 강화 · Lv ${enhancement}`;
  upgradeButton.disabled = enhancement >= 5;
  persistTrainState();
});
addDrillButton.addEventListener('click', () => {
  drillCount = Math.min(5, drillCount + 1);
  addDrillButton.textContent = `드릴 추가 · ${drillCount}대`;
  addDrillButton.disabled = drillCount >= 5;
  persistTrainState();
});

function findDrillTargets(): Array<{ chunk: { x: number; y: number; z: number }; voxel: VoxelCoordinate }> {
  const roots = runtime.scene.children.filter((object) => typeof object.userData.digChunkKey === 'string');
  const raycaster = new THREE.Raycaster();
  raycaster.far = 5;
  const targets = new Map<string, { chunk: { x: number; y: number; z: number }; voxel: VoxelCoordinate }>();

  for (let i = 0; i < drillCount; i++) {
    const spread = drillCount === 1 ? 0 : (i / (drillCount - 1) - 0.5) * 0.07;
    raycaster.setFromCamera(new THREE.Vector2(spread, 0), runtime.camera);
    const hit = raycaster.intersectObjects(roots, true)[0];
    if (!hit?.face) continue;

    const innerPoint = hit.point.clone().addScaledVector(
      hit.face.normal.clone().transformDirection(hit.object.matrixWorld),
      -0.002,
    );
    const gx = Math.floor(innerPoint.x / DIG_VOXEL_SIZE_METERS);
    const gy = Math.floor(innerPoint.y / DIG_VOXEL_SIZE_METERS);
    const gz = Math.floor(innerPoint.z / DIG_VOXEL_SIZE_METERS);
    const chunk = {
      x: Math.floor(gx / DIG_VOXELS_PER_AXIS),
      y: Math.floor(gy / DIG_VOXELS_PER_AXIS),
      z: Math.floor(gz / DIG_VOXELS_PER_AXIS),
    };
    const voxel = {
      x: gx - chunk.x * DIG_VOXELS_PER_AXIS,
      y: gy - chunk.y * DIG_VOXELS_PER_AXIS,
      z: gz - chunk.z * DIG_VOXELS_PER_AXIS,
    };
    targets.set(`${chunk.x},${chunk.y},${chunk.z}:${voxel.x},${voxel.y},${voxel.z}`, { chunk, voxel });
  }
  return [...targets.values()];
}

window.addEventListener('pointerdown', () => unlockAudio(), { once: true });
binding.start(renderer, () => [], (frame) => {
  elapsed += frame.deltaSeconds;
  const lightProgress = Math.min(1, elapsed / 2.2);
  ambient.intensity = 0.04 + 0.5 * lightProgress;
  workLamp.intensity = 35 * lightProgress;
  dust.rotation.y += frame.deltaSeconds * 0.012;
  drillBit.rotation.z += frame.deltaSeconds * 7;

  const targets = findDrillTargets();
  const autoMine = runtime.advanceAutomaticMining({
    deltaSeconds: frame.deltaSeconds,
    solidAhead: targets.length > 0,
    safety: {
      menuOpen: false,
      appFocused: !document.hidden,
      chunksReady: true,
      saveHealthy: true,
      fallSafe: true,
    },
    tool: { current: 100, maximum: 100, originalMaximum: 100 },
    enhancement,
    baseMineSeconds: 0.7 / drillCount,
  }, targets);

  // The automatic drill keeps pushing gently; collision stops it at the rock face.
  binding.setAutonomousForward(autoMine.decision.mode === 'blocked' || autoMine.decision.mode === 'paused' ? 0 : 0.45);

  if (autoMine.mined.length > 0) {
    for (const mineral of autoMine.mined) {
      collected.set(mineral, (collected.get(mineral) ?? 0) + 1);
    }
    persistTrainState();
  }
  if (autoMine.decision.mode === 'mining' && elapsed - lastDrillSound > 0.14) {
    const ramp = 0.25 + Math.min(1.25, elapsed / 4);
    digSound('drill', ramp);
    lastDrillSound = elapsed;
  }

  const collectionSummary = [...collected.entries()].map(([mineral, amount]) => `${mineral} ${amount}`).join(', ');
  status.textContent = collectionSummary
    ? `자동 채굴 중. 수집: ${collectionSummary}`
    : '자동 채굴 중. 주변 광물을 탐색하고 있습니다.';
});

const reconnectDialogue = getReconnectMemoryDialogue(trainSave.isReconnect);
if (reconnectDialogue) {
  reconnectLine.textContent = reconnectDialogue;
  reconnectLine.hidden = false;
  window.setTimeout(() => { reconnectLine.hidden = true; }, 5000);
}

// Audio begins after the first user gesture; the opening light still comes on automatically.
window.addEventListener('beforeunload', () => {
  binding.dispose();
  runtime.dispose();
  renderer.dispose();
}, { once: true });

