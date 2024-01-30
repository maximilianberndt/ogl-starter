import { Orbit } from 'ogl'
import '../css/style.css'
import { onResize, onTick } from './app'
import camera from './camera'
import { canvas, renderer, scene } from './renderer'
import { mesh } from './shape'

const controls = new Orbit(camera, { element: canvas.parentNode })
mesh.setParent(scene)

onTick(() => {
  controls.update()
  renderer.render({ scene, camera })
})

onResize(({ width, height }) => {
  renderer.setSize(width, height)
})
