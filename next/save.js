export const saveKey = 'dig-unified-v1';
const fresh = () => ({
  version: 1,
  revision: 0,
  rocks: 0,
  drills: [],
  front: null,
  transited: false,
  trips: 0,
  drillCondition: 100,
  cargo: [0,0,0],
  session: null,
  arrivalRadius: 1.64,
  arrivalStrength: 2.8,
});
const unreadable = '저장 기록을 읽을 수 없습니다. 원본을 보존했습니다.';
const vector = (v, valid = Number.isFinite) => Array.isArray(v) && v.length === 3 && v.every(n => valid(n));
function validSession(s) {
  const w = s?.world;
  return (s?.hull === undefined || (Number.isFinite(s.hull) && s.hull > 0 && s.hull <= 100)) && vector(s?.pos) && vector(s.velocity) && (s.drift === undefined || vector(s.drift)) && Number.isFinite(s.yaw) && Number.isFinite(s.pitch) &&
    typeof s.sensor === 'boolean' && Number.isInteger(s.entered) && s.entered >= -1 &&
    Number.isFinite(w?.elapsed) && w.elapsed >= 0 && vector(w.center, Number.isSafeInteger) &&
    (w.cargoTime === undefined || (Number.isFinite(w.cargoTime) && w.cargoTime >= 0 && w.cargoTime < 0.05)) &&
    typeof w.hasMouth === 'boolean' && Array.isArray(w.chunks) && w.chunks.every(c =>
      c && vector([c.x,c.y,c.z], Number.isSafeInteger) &&
      (c.debris === undefined || (c.debris && Number.isSafeInteger(c.debris.tick) && c.debris.tick >= 0 &&
        Number.isFinite(c.debris.time) && c.debris.time >= 0 && c.debris.time < 0.05 &&
        Array.isArray(c.debris.parts) && c.debris.parts.every(p => p && vector(p.point) && vector(p.speed) &&
        Number.isFinite(p.mass) && p.mass > 0))) &&
      (c.kind === undefined || (['rock','cave','empty','warehouse'].includes(c.kind) &&
        Number.isSafeInteger(c.seed) && c.seed >= 0 && c.seed <= 0xffffffff)) &&
      (c.kind !== 'warehouse' || (Array.isArray(c.items) && c.items.length <= 9 && c.items.every(item =>
        item && Number.isInteger(item.id) && item.id >= 0 && item.id < 9 && vector(item.point) &&
        (item.speed === undefined || vector(item.speed)) &&
        (item.cooldown === undefined || (Number.isFinite(item.cooldown) && item.cooldown >= 0)) &&
        (item.type === null || [0,1,2].includes(item.type))))) &&
      (Array.isArray(c.air) ? c.air.every(n => Number.isInteger(n) && n >= 0 && n < 32768)
        : typeof c.air === 'string' && /^[A-Za-z0-9+/]{5462}==$/.test(c.air)) &&
      Array.isArray(c.remaining) && c.remaining.length === 6 && c.remaining.every(n => Number.isInteger(n) && n >= 0 && n <= 1024) &&
      Array.isArray(c.faces) && c.faces.length <= 6 && c.faces.every(f =>
        f && vector(f.chunk, Number.isSafeInteger) && vector(f.point) && [0,1,2].includes(f.axis) &&
        [-1,1].includes(f.sign) && f.exit === false && Number.isFinite(f.ready) && Number.isFinite(f.cleared) &&
        Number.isFinite(f.radius) && f.radius > 0 && Number.isFinite(f.strength) && f.strength > 0));
}
export function readSave() {
  const raw = localStorage.getItem(saveKey);
  if (raw === null) return fresh();
  let s;
  try {
    s = JSON.parse(raw);
  } catch {
    throw Error(unreadable);
  }
  if (
    !s ||
    s.version !== 1 ||
    !Number.isSafeInteger(s.revision) ||
    s.revision < 0 ||
    !Number.isSafeInteger(s.rocks) ||
    s.rocks < 0 ||
    (s.cargo !== undefined && !vector(s.cargo, n => Number.isSafeInteger(n) && n >= 0)) ||
    (s.drillCondition !== undefined && !(Number.isInteger(s.drillCondition) && s.drillCondition >= 0 && s.drillCondition <= 100)) ||
    (s.session != null && !validSession(s.session)) ||
    !Array.isArray(s.drills) ||
    !(
      (s.drills.length === 0 && s.front === null) ||
      (s.drills.length === 1 &&
        s.front === 'drill-1' &&
        s.drills[0] === s.front)
    ) ||
    (s.arrivalStrength !== undefined && !(Number.isFinite(s.arrivalStrength) && s.arrivalStrength > 0)) ||
    (s.arrivalRadius !== undefined && !(Number.isFinite(s.arrivalRadius) && s.arrivalRadius > 0 && s.arrivalRadius <= 16)) ||
    (s.trips !== undefined && (!Number.isSafeInteger(s.trips) || s.trips < 0)) ||
    typeof s.transited !== 'boolean' ||
    (s.transited && !s.front)
  )
    throw Error(unreadable);
  return s;
}
export async function commit(revision, operation, session) {
  if (!navigator.locks)
    throw Error('안전한 저장을 위해 HTTPS 브라우저에서 다시 열어 주세요.');
  return navigator.locks.request(saveKey, () => {
    const s = readSave();
    if (s.revision !== revision)
      throw Error('다른 탭에서 진행이 바뀌었습니다. 다시 열어 주세요.');
    switch (operation?.type ?? operation) {
      case 'checkpoint':
        break;
      case 'pickup':
        if (!s.front || !session || ![0,1,2].includes(operation.item)) throw Error('회수할 수 없습니다.');
        s.cargo ??= [0,0,0];
        s.cargo[operation.item]++;
        break;
      case 'collect':
        s.rocks++;
        break;
      case 'craft':
        if (s.front || s.rocks < 3)
          throw Error('제작 조건을 다시 확인해 주세요.');
        s.rocks -= 3;
        s.front = 'drill-1';
        s.drills.push(s.front);
        break;
      case 'transit':
        if (!s.front) throw Error('이동 기록이 바뀌었습니다.');
        s.arrivalStrength = operation.strength;
        s.arrivalRadius = operation.radius;
        s.trips = (s.trips ?? Number(s.transited)) + 1;
        s.transited = true;
        s.session = null;
        break;
      case 'reboot':
        s.session = null;
        s.transited = false;
        s.drillCondition = Math.floor((s.drillCondition ?? 100)*0.4);
        break;
      case 'reset':
        Object.assign(s, fresh(), { revision });
        break;
      default:
        throw Error('알 수 없는 저장 요청입니다.');
    }
    if (session) s.session = session;
    s.revision++;
    localStorage.setItem(saveKey, JSON.stringify(s));
    return s;
  });
}
