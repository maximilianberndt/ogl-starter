import { Orbit } from "ogl";
import "../css/style.css";
import { onResize, onFrame } from "./app";
import camera from "./camera";
import { canvas, gl, post, renderer, resolution, scene } from "./renderer";
import { mesh } from "./components/shape";

const controls = new Orbit(camera, { element: canvas.parentNode });
mesh.setParent(scene);

gl.clearColor(1, 1, 1, 1);

onFrame(controls.update);
onFrame(() => {
  post.render({ scene, camera });
}, Infinity);

onResize(({ width, height }) => {
  renderer.setSize(width, height);
  resolution.value.set(width, height);
  post.resize();
});
