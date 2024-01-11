import { Color, Mesh, Program, Torus } from 'ogl'
import fragment from '../glsl/base/frag.glsl'
import vertex from '../glsl/base/vert.glsl'
import gui from './gui'
import { gl, scene } from './renderer'

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uColor: { value: new Color('#ff1643') },
  },
})

const geometry = new Torus(gl, {
  radius: 1,
  tube: 0.5,
  radialSegments: 16,
  tubularSegments: 32,
})

const mesh = new Mesh(gl, { geometry, program })
mesh.setParent(scene)

gui.addInput(program.uniforms.uColor, 'value', {
  title: 'Color',
  color: { type: 'float' },
})

const shape = {
  mesh,
  update: (time = 0) => {
    mesh.rotation.y += 0.01
  },
}

export default shape
