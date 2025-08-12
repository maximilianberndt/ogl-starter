import { Post, Renderer, Transform, Vec2 } from 'ogl'
import fragment from './frag.glsl'

export const canvas = document.querySelector('canvas') as HTMLCanvasElement

export const renderer = new Renderer({
  canvas,
  dpr: Math.min(window.devicePixelRatio, 1.4),
  powerPreference: 'high-performance',
  // Enable antialias when not using post processing
  // antialias: true,
})

export const { gl } = renderer

export const post = new Post(gl)
export const resolution = { value: new Vec2() }

export const pass = post.addPass({
  fragment,
  uniforms: {
    uResolution: resolution,
  },
})

export const scene = new Transform()

/* eslint-disable */
if (import.meta.hot) {
  import.meta.hot.accept('./frag.glsl', ({ default: fragment }) => {
    pass.program.setShaders({ fragment })
  })
}
