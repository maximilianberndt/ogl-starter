import { Pane } from 'tweakpane'
import { canvas } from './renderer'

type LoadPromise = Promise<any>
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
const loadQueue: LoadPromise[] = []
const renderQueue: { callback: RenderCallback; priority: number }[] =
  []
const resizeQueue: ResizeCallback[] = []
const debugQueue: DebugCallback[] = []

const isDebugEnabled = () =>
  import.meta.env.DEV || window.location.hash === '#debug'

const tick = (t = 0): void => {
  requestAnimationFrame(tick)

  deltaTime = t - now
  now = t

  const time = t * 0.001
  renderQueue.forEach(({ callback }) => callback(time, deltaTime))
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

export const load = (promise: LoadPromise) => loadQueue.push(promise)

export const onFrame = (callback: RenderCallback, priority = 1) => {
  renderQueue.push({ callback, priority })
  renderQueue.sort((a, b) => a.priority - b.priority)
}

export const onResize = (callback: ResizeCallback) =>
  resizeQueue.push(callback)

export const onDebug = (callback: DebugCallback) =>
  debugQueue.push(callback)

const initDebug = async () => {
  const { gui, stats } = await import('./debug')

  debugQueue.forEach((callback) => callback(gui))
  document.body.appendChild(stats.dom)
}

// Init with delay, so that all inital functions can be pushed to the queue
setTimeout(async () => {
  await Promise.allSettled(loadQueue)

  new ResizeObserver(resize).observe(document.body)

  // Enable debug
  const checkEnableDebug = () => {
    if (!isDebugEnabled()) return
    initDebug()

    window.removeEventListener('hashchange', checkEnableDebug)
  }

  if (isDebugEnabled()) {
    initDebug()
  } else {
    window.addEventListener('hashchange', checkEnableDebug)
  }

  tick()
}, 0)
