import "../style.css";
import gui from "./gui";
import vertex from "../glsl/normal/vert.glsl";
import fragment from "../glsl/normal/frag.glsl";

import { Renderer, Camera, Transform, Torus, Program, Mesh, Orbit } from "ogl";

const canvas = document.querySelector("canvas");

const renderer = new Renderer({
  canvas,
  dpr: Math.min(window.devicePixelRatio, 2),
  antialias: true,
  powerPreference: "high-performance",
});

const { gl } = renderer;
const scene = new Transform();

const camera = new Camera(gl, { fov: 35 });
camera.position.z = 5;

const controls = new Orbit(camera, { element: canvas.parentNode });

const program = new Program(gl, {
  vertex,
  fragment,
});

const geometry = new Torus(gl, {
  radius: 1,
  tube: 0.4,
  radialSegments: 16,
  tubularSegments: 32,
});

const torus = new Mesh(gl, { geometry, program });
torus.setParent(scene);

/**
 * Functions
 */
const tick = (t) => {
  requestAnimationFrame(tick);

  controls.update();

  renderer.render({ scene, camera });
};

const resize = () => {
  const { width, height } = canvas.parentNode.getBoundingClientRect();

  renderer.setSize(width, height);

  camera.perspective({
    aspect: gl.canvas.width / gl.canvas.height,
  });
};

window.addEventListener("resize", resize, false);

resize();
tick();
