import { Pane } from 'tweakpane'
import { canvas } from './renderer'

type RenderCallback = (t: number, deltaTime: number) => any
type ResizeCallback = ({
  width,
  height,
}: {
  width: number
  height: number
}) => any
type DebugCallback = (gui: Pane) => void

let now = 0
let deltaTime = 0
const isDebugEnabled =
  import.meta.env.DEV || window.location.hash === '#debug'
const renderQueue: RenderCallback[] = []
const resizeQueue: ResizeCallback[] = []
const debugQueue: DebugCallback[] = []

const tick = (t = 0): void => {
  requestAnimationFrame(tick)

  deltaTime = t - now
  now = t

  renderQueue.forEach((callback) => callback(t * 0.001, deltaTime))
}

const resize = () => {
  const wrapper = canvas.parentNode as HTMLDivElement
  if (!wrapper) return

  const size = {
    width: wrapper.clientWidth || 0,
    height: wrapper.clientHeight || 0,
  }

  resizeQueue.forEach((callback) => callback(size))
}

export const onTick = (callback: RenderCallback) =>
  renderQueue.push(callback)

export const onResize = (callback: ResizeCallback) =>
  resizeQueue.push(callback)

export const onDebug = (callback: DebugCallback) =>
  debugQueue.push(callback)

const initDebug = async () => {
  const gui = (await import('./gui')).default
  debugQueue.forEach((callback) => callback(gui))
}

// Init with delay, so that all inital functions can be pushed to the queue
setTimeout(() => {
  new ResizeObserver(resize).observe(document.body)
  tick()

  // Check to enable debug and lazy load
  if (isDebugEnabled) initDebug()
}, 0)
