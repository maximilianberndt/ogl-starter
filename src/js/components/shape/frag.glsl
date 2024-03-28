precision highp float;

uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
	gl_FragColor.rgb = uColor;
	gl_FragColor.a = 1.0;
}
