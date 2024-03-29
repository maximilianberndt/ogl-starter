import '../css/style.css'
import { onFrame, onResize } from './app'
import camera from './components/camera'
import { mesh } from './components/shape'
import { gl, post, renderer, resolution, scene } from './renderer'

mesh.setParent(scene)

gl.clearColor(1, 1, 1, 1)

onFrame(() => {
  post.render({ scene, camera })
}, Infinity - 1)

onResize(({ width, height }) => {
  renderer.setSize(width, height)
  resolution.value.set(width, height)
  post.resize()
})
