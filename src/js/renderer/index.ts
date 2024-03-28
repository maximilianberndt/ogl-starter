import { Post, Renderer, Transform, Vec2 } from 'ogl'
import fragment from './frag.glsl'

export const canvas = document.querySelector(
  'canvas'
) as HTMLCanvasElement

export const renderer = new Renderer({
  canvas,
  dpr: Math.min(window.devicePixelRatio, 2),
  powerPreference: 'high-performance',
  antialias: true,
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
