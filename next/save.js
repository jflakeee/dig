export const saveKey = 'dig-unified-v1';
const fresh = () => ({
  version: 1,
  revision: 0,
  rocks: 0,
  drills: [],
  front: null,
  transited: false,
  trips: 0,
  arrivalRadius: 1.64,
});
const unreadable = '저장 기록을 읽을 수 없습니다. 원본을 보존했습니다.';
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
    !Array.isArray(s.drills) ||
    !(
      (s.drills.length === 0 && s.front === null) ||
      (s.drills.length === 1 &&
        s.front === 'drill-1' &&
        s.drills[0] === s.front)
    ) ||
    (s.arrivalRadius !== undefined && !(Number.isFinite(s.arrivalRadius) && s.arrivalRadius > 0 && s.arrivalRadius <= 16)) ||
    (s.trips !== undefined && (!Number.isSafeInteger(s.trips) || s.trips < 0)) ||
    typeof s.transited !== 'boolean' ||
    (s.transited && !s.front)
  )
    throw Error(unreadable);
  return s;
}
export async function commit(revision, operation) {
  if (!navigator.locks)
    throw Error('안전한 저장을 위해 HTTPS 브라우저에서 다시 열어 주세요.');
  return navigator.locks.request(saveKey, () => {
    const s = readSave();
    if (s.revision !== revision)
      throw Error('다른 탭에서 진행이 바뀌었습니다. 다시 열어 주세요.');
    switch (operation?.type ?? operation) {
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
        s.arrivalRadius = operation.radius;
        s.trips = (s.trips ?? Number(s.transited)) + 1;
        s.transited = true;
        break;
      case 'reset':
        Object.assign(s, fresh(), { revision });
        break;
      default:
        throw Error('알 수 없는 저장 요청입니다.');
    }
    s.revision++;
    localStorage.setItem(saveKey, JSON.stringify(s));
    return s;
  });
}
