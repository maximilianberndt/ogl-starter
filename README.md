# ogl-starter

Starter template for [ogl](https://github.com/oframe/ogl) with [vite](https://vitejs.dev/), [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) and [tweakpane](https://cocopon.github.io/tweakpane/). Provides a simple setup with typescirpt, orbit controls, post processing, shader hot module reload and bundle splitting in production.

## Demo

[ogl-starter.netlify.app#debug](https://ogl-starter.netlify.app#debug)

## Installation

```
yarn && yarn dev
```

## Usage

There are 4 functions provided to make development easier

**load**
Add a new promise to suspend the scene from rendering

```
load(new Promise((resolve) => {
  const texture = TextureLoader.load(gl, { src: '/noise.png' })
  program.uniforms.uMap.value = texture

  resolve(true)
}))
```

**onLoad**
Gets invoced after all load promises are resolved

```
onLoad(() =>{
  document.querySelector("#loader").style.visiblity = "hidden"
})
```

**onFrame**
Gets called every tick, provides deltaTime

```
onFrame((time, deltaTime) => {
  mesh.rotation.x = time
})
```

**onDebug**
Provides access to tweakpane.
In production this gets called by adding #debug to your url. This enables splitting tweakpane from the main bundle and lazy loading it.

```
onDebug(gui => {
  const folder = gui.addFolder({ title: 'Shape' })
})
```
