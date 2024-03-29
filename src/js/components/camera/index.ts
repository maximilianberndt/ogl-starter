import { Camera, Orbit } from 'ogl'
import { onFrame, onResize } from '../../app'
import { canvas, gl } from '../../renderer'

const camera = new Camera(gl, { fov: 75 })
camera.position.z = 5

const controls = new Orbit(camera, {
  element: canvas!.parentNode as HTMLDivElement,
})

onFrame(controls.update)

onResize(({ width = 1, height = 1 }) => {
  camera.perspective({
    aspect: width / height,
  })
})

export default camera
