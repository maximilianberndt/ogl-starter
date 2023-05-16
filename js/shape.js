import { Torus, Program, Mesh, Color } from "ogl";
import vertex from "../glsl/base/vert.glsl";
import fragment from "../glsl/base/frag.glsl";
import { gl, scene } from "./renderer";

const program = new Program(gl, {
	vertex,
	fragment,
	uniforms: {
		uColor: { value: new Color("#ff1643") }
	}
});

const geometry = new Torus(gl, {
	radius: 1,
	tube: 0.5,
	radialSegments: 16,
	tubularSegments: 32,
});

const mesh = new Mesh(gl, { geometry, program });
mesh.setParent(scene);

const shape = {
	mesh,
	update: (time = 0) => {
		mesh.rotation.y += 0.01
	}
}

export default shape