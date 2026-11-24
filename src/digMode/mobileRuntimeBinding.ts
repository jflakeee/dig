import * as THREE from 'three';
import { DIG_CHUNK_SIZE_METERS, type LocalPosition } from './chunkCoordinates';
import {
  attachDigModeMobileControls,
  type DigModeMobileControls,
} from './mobileControls';
import { DigModeRuntime } from './runtime';
import type { PortalGravityField } from './portalGravity';

export type MobileRuntimeFrame = Readonly<{
  position: LocalPosition;
  streaming: ReturnType<DigModeRuntime['updateFrame']>;
}>;

/** Bridge touch input to one 4D runtime simulation frame. */
export class DigModeMobileRuntimeBinding {
  private readonly controls: DigModeMobileControls;
  private position: LocalPosition;

  constructor(
    private readonly runtime: DigModeRuntime,
    container: HTMLElement,
    initialPosition: LocalPosition,
    private readonly settings: {
      radius: number;
      thrustAcceleration: number;
      maximumSpeed: number;
      lookSensitivity?: number;
    },
  ) {
    this.position = { ...initialPosition };
    this.controls = attachDigModeMobileControls(container);
    const visible = visibleChunkKeys(runtime.scene, runtime.camera);
    runtime.updateFrame(this.position, visible);
  }

  /** Call once per animation frame before rendering the runtime scene. */
  step(deltaSeconds: number, passageFields: readonly PortalGravityField[] = []): MobileRuntimeFrame {
    const input = this.controls.consumeFrameInput();
    this.runtime.applyLookDelta(
      input.lookDeltaX,
      input.lookDeltaY,
      this.settings.lookSensitivity ?? 0.003,
    );
    const movement = this.runtime.moveMachine({
      position: this.position,
      forward: input.forward,
      strafe: input.strafe,
      vertical: input.vertical,
      deltaSeconds,
      radius: this.settings.radius,
      thrustAcceleration: this.settings.thrustAcceleration,
      maximumSpeed: this.settings.maximumSpeed,
      passageFields,
    });
    this.position = movement.position;
    const visible = visibleChunkKeys(this.runtime.scene, this.runtime.camera);
    const streaming = this.runtime.updateFrame(this.position, visible);
    return { position: this.position, streaming };
  }

  getPosition(): LocalPosition {
    return { ...this.position };
  }

  dispose(): void {
    this.controls.dispose();
  }
}

function visibleChunkKeys(scene: THREE.Scene, camera: THREE.PerspectiveCamera): Set<string> {
  camera.updateMatrixWorld(true);
  scene.updateMatrixWorld(true);
  const viewProjection = new THREE.Matrix4()
    .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  const frustum = new THREE.Frustum().setFromProjectionMatrix(viewProjection);
  const visible = new Set<string>();
  const halfSize = DIG_CHUNK_SIZE_METERS / 2;
  const chunkRadius = Math.sqrt(3) * halfSize;

  for (const object of scene.children) {
    const key = object.userData.digChunkKey;
    if (typeof key !== 'string') continue;
    const center = new THREE.Vector3();
    object.getWorldPosition(center);
    center.addScalar(halfSize);
    if (frustum.intersectsSphere(new THREE.Sphere(center, chunkRadius))) visible.add(key);
  }
  return visible;
}
