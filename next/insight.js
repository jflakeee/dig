// Who is on the other side of a trade (docs/dig-self-identity-lore.md 7-5).
// The counterpart stays unknown; the machine only realises, step by step,
// what the evidence allows. Each step needs the one before. Trial values.
import { valueCollapse } from './value.js';
export const fresh = () => ({traces: [], traceSeen: false, urgentBuy: false, lowBid: false, trades: 0, rebirth: false});
export const urgentRatio = 1.6;          // a purchase at 1.6x the base value or more counts as urgent
export const tradesForFaction = 30;
export const maxTraces = 64;
// What a sold or offered thing leaves as a trace.
export const traceKey = t => t.mineral ? 'm:' + t.mineral : t.ceramic ? 'ceramic' : t.part ? 'part:' + t.part : t.kind === 'capsule' ? 'capsule:' + t.element : t.kind;
export function addTrace(s, thing) {
  const key = traceKey(thing);
  if (!s.insight.traces.includes(key)) s.insight.traces = [key, ...s.insight.traces].slice(0, maxTraces);
}
export const stages = [
  {text: '거래 상대는 알 수 없다. 신호와 겉모습만 보인다.'},
  {need: i => i.traceSeen, text: '상대가 내놓은 물품 중에 내가 판매할 때 남긴 흔적이 있는 것이 있다.'},
  {need: i => i.urgentBuy && i.lowBid, text: '같은 물건을 급해서 비싸게 산 적도, 여유가 있어 싸게 부른 적도 있다. 저쪽의 상대도 그랬다. 상대는 과거나 미래의 나일 수도 있다.'},
  {need: i => i.trades >= tradesForFaction, text: '시세는 날마다 바뀐다. 그 시세를 무한한 내가 한 무리의 세력처럼 함께 움직이고 있을 수도 있다.'},
  {need: i => i.rebirth, text: '죽고 다시 깨어난 나는 다른 경험과 다른 취향을 갖는다. 그렇다면 그것은 지금의 나와 다른 존재다.'},
  {need: (i, s) => valueCollapse(s) >= 1, text: '무한한 평행우주에서, 거래 상대가 나이든 아니든 상관없어졌다. 그 물음도 무의미해졌다.'},
];
// How far the realisation has come: the first step whose evidence is missing stops it.
export function insightStage(s) {
  const i = s?.insight ?? fresh();
  let n = 0;
  while (n + 1 < stages.length && stages[n + 1].need(i, s)) n++;
  return n;
}
export const validInsight = i => !!i && Array.isArray(i.traces) && i.traces.length <= maxTraces &&
  i.traces.every(t => typeof t === 'string' && t.length <= 80) && new Set(i.traces).size === i.traces.length &&
  ['traceSeen', 'urgentBuy', 'lowBid', 'rebirth'].every(k => typeof i[k] === 'boolean') &&
  Number.isSafeInteger(i.trades) && i.trades >= 0 && Object.keys(i).length === 6;
