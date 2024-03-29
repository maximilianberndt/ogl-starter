import { Color, Mesh, Program, Torus } from 'ogl'
import { onDebug, onFrame } from '../../app'
import { gl } from '../../renderer'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

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

export const mesh = new Mesh(gl, { geometry, program })

onDebug((gui) => {
  const folder = gui.addFolder({ title: 'Shape' })

  folder.addBinding(program.uniforms.uColor, 'value', {
    label: 'Color',
    color: { type: 'float' },
  })
})

onFrame((time = 0) => {
  mesh.rotation.y = time
})

if (import.meta.hot) {
  import.meta.hot.accept(
    ['./frag.glsl', './vert.glsl'],
    ([frag, vert]) => {
      program.setShaders({
        fragment: frag?.default,
        vertex: vert?.default,
      })
    }
  )
}
