import * as THREE from 'three';

export const DIG_DUST_COLOR = 0x3a342e;
export const DIG_DUST_FADE_START_METERS = 224;
export const DIG_DUST_OPAQUE_METERS = 256;

/**
 * Linear dust fog for the 4D mode scene.
 * It begins obscuring distant terrain at 224m and fully blends it into dust
 * by 256m, matching the session chunk eviction boundary.
 */
export function createDigModeDustFog(
  color = DIG_DUST_COLOR,
): THREE.Fog {
  return new THREE.Fog(
    new THREE.Color(color),
    DIG_DUST_FADE_START_METERS,
    DIG_DUST_OPAQUE_METERS,
  );
}

/** Apply only to the 4D mode scene, leaving the legacy mine scene untouched. */
export function applyDigModeDustFog(scene: THREE.Scene): THREE.Fog {
  const fog = createDigModeDustFog();
  scene.fog = fog;
  return fog;
}
