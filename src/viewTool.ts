import * as T from 'three';

/** Camera-mounted spherical mining submersible; upgrades change its drill glow, not its silhouette. */
export class ViewTool {
  root = new T.Group();
  private drill: T.Group;
  private glow: T.MeshBasicMaterial;
  private swing = 0;
  private selected = 0;

  constructor(camera: T.Camera) {
    const hull = new T.MeshStandardMaterial({color: 0x526f7c, metalness: .8, roughness: .3});
    const trim = new T.MeshStandardMaterial({color: 0x23363f, metalness: .75, roughness: .35});
    const glass = new T.MeshStandardMaterial({color: 0x2ac5e4, metalness: .35, roughness: .16, emissive: 0x084354});
    this.glow = new T.MeshBasicMaterial({color: 0x78e9ff});

    const sphere = (radius: number, x: number, y: number, z: number, material: T.Material) => {
      const mesh = new T.Mesh(new T.SphereGeometry(radius, 20, 14), material);
      mesh.position.set(x, y, z);
      this.root.add(mesh);
      return mesh;
    };
    sphere(.19, 0, 0, 0, hull);
    const viewport = sphere(.125, 0, .025, -.115, glass);
    viewport.scale.set(1, .65, .48);
    const ring = new T.Mesh(new T.TorusGeometry(.155, .014, 7, 24), trim);
    ring.rotation.x = Math.PI / 2;
    ring.position.z = -.105;
    this.root.add(ring);
    for (const side of [-1, 1]) {
      const thruster = new T.Mesh(new T.CylinderGeometry(.045, .055, .16, 10), trim);
      thruster.rotation.x = Math.PI / 2;
      thruster.position.set(side * .17, -.055, .1);
      this.root.add(thruster);
      sphere(.032, side * .17, -.055, .19, this.glow);
    }
    this.drill = new T.Group();
    const collar = new T.Mesh(new T.CylinderGeometry(.052, .07, .09, 12), trim);
    collar.rotation.x = Math.PI / 2;
    this.drill.add(collar);
    const bit = new T.Mesh(new T.ConeGeometry(.052, .22, 8), hull);
    bit.rotation.x = -Math.PI / 2;
    bit.position.z = -.14;
    this.drill.add(bit);
    this.drill.position.set(0, -.09, -.19);
    this.root.add(this.drill);
    this.root.position.set(.32, -.32, -.7);
    camera.add(this.root);
    this.select(0);
  }

  select(i: number) {
    this.selected = i;
    this.glow.color.setHex([0x78e9ff, 0xffce6c, 0xc994ff][i] ?? 0x78e9ff);
  }

  hit() { this.swing = 1; }

  update(dt: number) {
    this.swing = Math.max(0, this.swing - dt * 5);
    this.drill.rotation.z += dt * (this.swing > 0 ? 24 : 2);
    this.root.position.y = -.32 - Math.sin(this.swing * Math.PI) * .025;
    this.root.rotation.z = -.08 + Math.sin(this.swing * Math.PI) * .06;
  }
}
