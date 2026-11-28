import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createTerrain } from '../next/view3d.js';
import { stoneCount } from '../next/rock-shapes.js';

const fill = (terrain, n) => {
  const m = new THREE.Matrix4(), c = new THREE.Color(1, 1, 1);
  terrain.begin();
  for (let i = 0; i < n; i++) terrain.add(i % stoneCount, m.makeTranslation(i, 0, 0), c);
  terrain.end();
};

test('batched terrain is one mesh that pools, grows and hides stones', () => {
  const scene = new THREE.Scene();
  const terrain = createTerrain(null, scene, new THREE.MeshStandardMaterial(), true);
  assert.equal(terrain.kind, 'batched');
  assert.equal(scene.children.length, 1);
  const mesh = scene.children[0];
  fill(terrain, 3000);
  assert.equal(terrain.count(), 3000);
  assert.ok(mesh.maxInstanceCount >= 3000);
  fill(terrain, 10);
  assert.equal(terrain.count(), 10);
  assert.equal(mesh.getVisibleAt(9), true);
  assert.equal(mesh.getVisibleAt(10), false);
  assert.equal(mesh.getVisibleAt(2999), false);
  assert.equal(mesh.getGeometryIdAt(5), 5 % stoneCount);
  fill(terrain, 0);
  assert.equal(mesh.visible, false);
});

test('instanced terrain keeps one mesh per variant', () => {
  const scene = new THREE.Scene();
  const terrain = createTerrain(null, scene, new THREE.MeshStandardMaterial(), false);
  assert.equal(terrain.kind, 'instanced');
  assert.equal(scene.children.length, stoneCount);
  fill(terrain, stoneCount * 2);
  assert.equal(terrain.count(), stoneCount * 2);
  assert.ok(scene.children.every(m => m.count === 2 && m.visible));
});
