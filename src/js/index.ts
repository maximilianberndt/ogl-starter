import { Orbit } from 'ogl'
import '../css/style.css'
import { onFrame, onResize } from './app'
import camera from './components/camera'
import { mesh } from './components/shape'
import {
  canvas,
  gl,
  post,
  renderer,
  resolution,
  scene,
} from './renderer'

const controls = new Orbit(camera, {
  element: canvas!.parentNode as HTMLDivElement,
})
mesh.setParent(scene)

gl.clearColor(1, 1, 1, 1)

onFrame(controls.update)
onFrame(() => {
  post.render({ scene, camera })
}, Infinity - 1)

onResize(({ width, height }) => {
  renderer.setSize(width, height)
  resolution.value.set(width, height)
  post.resize()
})
