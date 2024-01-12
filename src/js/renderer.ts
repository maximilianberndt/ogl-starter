import { Renderer, Transform } from 'ogl'

export const canvas = document.querySelector(
  'canvas'
) as HTMLCanvasElement

export const renderer = new Renderer({
  canvas,
  dpr: Math.min(window.devicePixelRatio, 2),
  antialias: true,
  powerPreference: 'high-performance',
})

export const { gl } = renderer
export const scene = new Transform()
