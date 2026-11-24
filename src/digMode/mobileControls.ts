import { joystick } from '../input';

export type DigModeMobileInput = Readonly<{
  forward: number;
  strafe: number;
  vertical: number;
  lookDeltaX: number;
  lookDeltaY: number;
}>;

export type DigModeMobileControls = Readonly<{
  consumeFrameInput(): DigModeMobileInput;
  dispose(): void;
}>;

/**
 * Add a left movement stick, right-side look surface, and vertical thrust
 * buttons to a positioned game container. Pointer events support touch and pen.
 */
export function attachDigModeMobileControls(
  container: HTMLElement,
): DigModeMobileControls {
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-label', 'Mobile movement controls');
  overlay.style.cssText = 'position:absolute;inset:0;z-index:5;pointer-events:none;touch-action:none;user-select:none';

  const stick = document.createElement('div');
  stick.setAttribute('aria-label', 'Move');
  stick.style.cssText = 'position:absolute;left:22px;bottom:22px;width:104px;height:104px;border:2px solid #ffffff88;border-radius:50%;background:#17202a55;pointer-events:auto;touch-action:none';

  const knob = document.createElement('div');
  knob.style.cssText = 'position:absolute;left:31px;top:31px;width:42px;height:42px;border-radius:50%;background:#eeeeeecc;transform:translate(0,0);pointer-events:none';
  stick.append(knob);

  const look = document.createElement('div');
  look.setAttribute('aria-label', 'Look around');
  look.style.cssText = 'position:absolute;left:42%;right:0;top:0;bottom:110px;pointer-events:auto;touch-action:none';

  const vertical = document.createElement('div');
  vertical.style.cssText = 'position:absolute;right:22px;bottom:22px;display:flex;flex-direction:column;gap:8px;pointer-events:auto';
  const rise = makeThrustButton('Ascend', '▲');
  const descend = makeThrustButton('Descend', '▼');
  vertical.append(rise, descend);

  overlay.append(stick, look, vertical);
  const priorPosition = getComputedStyle(container).position;
  if (priorPosition === 'static') container.style.position = 'relative';
  container.append(overlay);

  let pointerId: number | null = null;
  let forward = 0;
  let strafe = 0;
  let verticalAxis = 0;
  let lookDeltaX = 0;
  let lookDeltaY = 0;
  let lookPointer: number | null = null;
  let lastLookX = 0;
  let lastLookY = 0;

  const updateStick = (event: PointerEvent) => {
    const rect = stick.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const maxRadius = rect.width * 0.34;
    const axes = joystick(dx, dy, maxRadius, 0.12);
    strafe = axes.x;
    forward = -axes.y;
    const length = Math.hypot(dx, dy);
    const scale = length > maxRadius ? maxRadius / length : 1;
    knob.style.transform = `translate(${dx * scale}px,${dy * scale}px)`;
  };
  const resetStick = () => {
    pointerId = null;
    forward = 0;
    strafe = 0;
    knob.style.transform = 'translate(0,0)';
  };
  const onStickDown = (event: PointerEvent) => {
    event.preventDefault();
    pointerId = event.pointerId;
    stick.setPointerCapture(event.pointerId);
    updateStick(event);
  };
  const onStickMove = (event: PointerEvent) => {
    if (event.pointerId === pointerId) updateStick(event);
  };

  const onLookDown = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    lookPointer = event.pointerId;
    lastLookX = event.clientX;
    lastLookY = event.clientY;
    look.setPointerCapture(event.pointerId);
  };
  const onLookMove = (event: PointerEvent) => {
    if (event.pointerId !== lookPointer) return;
    lookDeltaX += event.clientX - lastLookX;
    lookDeltaY += event.clientY - lastLookY;
    lastLookX = event.clientX;
    lastLookY = event.clientY;
  };
  const onLookEnd = (event: PointerEvent) => {
    if (event.pointerId === lookPointer) lookPointer = null;
  };

  const setVertical = (value: number) => (event: PointerEvent) => {
    event.preventDefault();
    verticalAxis = value;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };
  const clearVertical = (event: PointerEvent) => {
    event.preventDefault();
    verticalAxis = 0;
  };
  rise.addEventListener('pointerdown', setVertical(1));
  descend.addEventListener('pointerdown', setVertical(-1));
  rise.addEventListener('pointerup', clearVertical);
  descend.addEventListener('pointerup', clearVertical);
  rise.addEventListener('pointercancel', clearVertical);
  descend.addEventListener('pointercancel', clearVertical);
  rise.addEventListener('lostpointercapture', clearVertical);
  descend.addEventListener('lostpointercapture', clearVertical);

  stick.addEventListener('pointerdown', onStickDown);
  stick.addEventListener('pointermove', onStickMove);
  stick.addEventListener('pointerup', resetStick);
  stick.addEventListener('pointercancel', resetStick);
  stick.addEventListener('lostpointercapture', resetStick);
  look.addEventListener('pointerdown', onLookDown);
  look.addEventListener('pointermove', onLookMove);
  look.addEventListener('pointerup', onLookEnd);
  look.addEventListener('pointercancel', onLookEnd);
  look.addEventListener('lostpointercapture', onLookEnd);

  return {
    consumeFrameInput() {
      const frame = { forward, strafe, vertical: verticalAxis, lookDeltaX, lookDeltaY };
      lookDeltaX = 0;
      lookDeltaY = 0;
      return frame;
    },
    dispose() {
      resetStick();
      lookPointer = null;
      overlay.remove();
      if (priorPosition === 'static') container.style.position = '';
    },
  };
}

function makeThrustButton(label: string, symbol: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.textContent = symbol;
  button.style.cssText = 'width:48px;height:48px;border:1px solid #ffffff88;border-radius:12px;background:#17202a99;color:white;font-size:20px;touch-action:none';
  return button;
}
