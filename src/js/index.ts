import { Orbit } from 'ogl'
import '../css/style.css'
import { onResize, onTick } from './app'
import camera from './camera'
import {
  canvas,
  gl,
  post,
  renderer,
  resolution,
  scene,
} from './renderer'
import { mesh } from './shape'

const controls = new Orbit(camera, { element: canvas.parentNode })
mesh.setParent(scene)

gl.clearColor(1, 1, 1, 1)

onTick(() => {
  controls.update()

  post.render({ scene, camera })
})

onResize(({ width, height }) => {
  renderer.setSize(width, height)
  resolution.value.set(width, height)
  post.resize()
})
