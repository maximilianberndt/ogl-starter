import { Renderer, Transform } from "ogl";

const canvas = document.querySelector("canvas");

const renderer = new Renderer({
	canvas,
	dpr: Math.min(window.devicePixelRatio, 2),
	antialias: true,
	powerPreference: "high-performance",
});

const { gl } = renderer;
const scene = new Transform();

export { gl, renderer, scene, canvas }