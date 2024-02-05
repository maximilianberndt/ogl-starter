import { Color, Mesh, Program, Torus } from "ogl";
import fragment from "../../glsl/base/frag.glsl";
import vertex from "../../glsl/base/vert.glsl";
import { onDebug, onFrame } from "../app";
import { gl } from "../renderer";

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uColor: { value: new Color("#ff1643") },
  },
});

const geometry = new Torus(gl, {
  radius: 1,
  tube: 0.5,
  radialSegments: 16,
  tubularSegments: 32,
});

export const mesh = new Mesh(gl, { geometry, program });

onDebug((gui) => {
  gui.addBinding(program.uniforms.uColor, "value", {
    title: "Color",
    color: { type: "float" },
  });
});

onFrame((time = 0) => {
  mesh.rotation.y = time;
});
