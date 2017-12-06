precision highp float;
//do i need to worry about mediump?
//
/* NOTES
gl_TexCoord[0] == vUV
*/

varying vec2 vUV;

uniform sampler2D textureSampler;

uniform sampler2D monkeyTexture;


uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {
    gl_FragColor = vec4(0, 0, 0, 1.);
    gl_FragColor = texture2D(monkeyTexture, vUV);
}
