precision highp float;

uniform sampler2D tMap;
uniform vec2 uResolution;

varying vec2 vUv;

#include ../utils/fxaa;

void main() {
	vec3 color = fxaa(tMap, vUv, uResolution).rgb;

    // Vignette Effect
    float distanceFromCenter = distance(vUv, vec2(0.5));
    color = (1. - distanceFromCenter * .2) * color;
	
	gl_FragColor.rgb = color;
	gl_FragColor.a = 1.0;
}