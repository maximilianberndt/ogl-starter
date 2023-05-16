import "../style.css";
import { Orbit } from "ogl";
import { renderer, scene, canvas } from "./renderer";
import camera, { resizeCamera } from "./camera";
import shape from "./shape";

const controls = new Orbit(camera, { element: canvas.parentNode });

const tick = (t) => {
	requestAnimationFrame(tick);

	const time = t * 0.001

	controls.update();
	shape.update(time)

	renderer.render({ scene, camera });
};

const resize = () => {
	const { width, height } = canvas.parentNode.getBoundingClientRect();

	renderer.setSize(width, height);

	resizeCamera({ width, height })
};

window.addEventListener("resize", resize, false);

resize();
tick();
