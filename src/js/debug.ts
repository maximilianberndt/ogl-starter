import Stats from "stats-gl";
import { Pane } from "tweakpane";
import { onFrame } from "./app";
import { gl } from "./renderer";

export const gui = new Pane();

export const stats = new Stats({
  logsPerSecond: 20,
  samplesLog: 100,
  samplesGraph: 10,
  precision: 2,
  horizontal: true,
  minimal: true,
  mode: 0,
});

stats.init(gl);

onFrame(() => {
  stats.begin();
}, -Infinity);

onFrame(() => {
  stats.update();
  stats.end();
}, Infinity);
