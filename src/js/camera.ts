import { Camera } from 'ogl'
import { onResize } from './app'
import { gl } from './renderer'

const camera = new Camera(gl, { fov: 75 })
camera.position.z = 5

onResize(({ width = 1, height = 1 }) => {
  camera.perspective({
    aspect: width / height,
  })
})

export default camera
