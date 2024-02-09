import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { Pane } from 'tweakpane'
import { onFrame } from './app'

export const gui = new Pane()
gui.registerPlugin(EssentialsPlugin)

const folder = gui.addFolder({ title: 'Debug' })
const fpsGraph = folder.addBlade({ view: 'fpsgraph', rows: 2 })

onFrame(() => {
  fpsGraph.begin()
}, -Infinity)

onFrame(() => {
  fpsGraph.end()
}, Infinity)
