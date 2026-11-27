import * as THREE from 'three';
import {
  DIG_DUST_COLOR,
  applyDigModeDustFog,
  DIG_DUST_OPAQUE_METERS,
} from './dustFog';

export type DigModeRenderScene = Readonly<{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}>;

/**
 * Create the isolated 4D mode scene. The camera far plane extends past the
 * dust boundary so terrain fades fully into the matching background color.
 */
export function createDigModeRenderScene(
  aspect = 1,
  fieldOfView = 70,
): DigModeRenderScene {
  if (!Number.isFinite(aspect) || aspect <= 0) {
    throw new Error('Camera aspect ratio must be a positive finite number');
  }
  if (!Number.isFinite(fieldOfView) || fieldOfView <= 0 || fieldOfView >= 180) {
    throw new Error('Camera field of view must be between 0 and 180 degrees');
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(DIG_DUST_COLOR);
  applyDigModeDustFog(scene);

  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspect,
    0.05,
    DIG_DUST_OPAQUE_METERS + 64,
  );

  return { scene, camera };
}
