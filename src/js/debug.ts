import { Pane } from 'tweakpane'
import { onFrame } from './app'

const options = {
  fps: 0,
}

export const gui = new Pane()

const folder = gui.addFolder({ title: 'Debug' })
folder.addBinding(options, 'fps', { readonly: true })

onFrame((t, deltaTime) => {
  options.fps = 1000 / deltaTime
}, Infinity)
