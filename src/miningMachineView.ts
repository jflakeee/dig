import * as T from 'three';

/** First-person mining robot chassis and gas exhaust, attached to camera. */
export function createMiningMachineView(camera: T.PerspectiveCamera) {
  const root = new T.Group();
  root.name = 'Mineral-powered mining machine';
  const hull = new T.Mesh(
    new T.BoxGeometry(0.44, 0.2, 0.32),
    new T.MeshStandardMaterial({ color: 0x586c74, metalness: 0.75, roughness: 0.35 }),
  );
  hull.position.set(0, -0.44, -0.63);
  root.add(hull);
  const reactor = new T.Mesh(
    new T.CylinderGeometry(0.065, 0.065, 0.18, 8),
    new T.MeshBasicMaterial({ color: 0x4be2dd }),
  );
  reactor.rotation.z = Math.PI / 2;
  reactor.position.set(0, -0.38, -0.64);
  root.add(reactor);
  const nozzle = new T.Mesh(
    new T.ConeGeometry(0.095, 0.3, 8),
    new T.MeshBasicMaterial({ color: 0x7eeeff, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  // The nozzle plume points backward, opposite the camera's forward direction.
  nozzle.rotation.x = Math.PI / 2;
  nozzle.position.set(0, -0.43, -0.3);
  root.add(nozzle);
  root.visible = false;
  camera.add(root);
  return {
    setActive(active: boolean) { root.visible = active; },
    update(moving: boolean, boosting: boolean, timeSeconds: number) {
      nozzle.visible = moving;
      if (!moving) return;
      const pulse = 0.9 + Math.sin(timeSeconds * 28) * 0.1;
      nozzle.scale.setScalar((boosting ? 1.5 : 0.8) * pulse);
      (nozzle.material as T.MeshBasicMaterial).opacity = boosting ? 0.75 : 0.4;
    },
    dispose() {
      camera.remove(root);
      hull.geometry.dispose();
      (hull.material as T.Material).dispose();
      reactor.geometry.dispose();
      (reactor.material as T.Material).dispose();
      nozzle.geometry.dispose();
      (nozzle.material as T.Material).dispose();
    },
  };
}
