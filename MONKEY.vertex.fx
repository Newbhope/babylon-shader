precision highp float;

// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform float time;
uniform sampler2D monkeyTexture;

// Varying
varying vec2 vUV;


void main(void) {
    vec3 v = position;

    vec3 monkeyColor = texture2D(monkeyTexture, vUV).rgb;

    v.x += sin(2.0 * position.x + (time)) * monkeyColor.r;
    v.y += sin(2.0 * position.y + (time)) * monkeyColor.r;
    v.z += sin(2.0 * position.z + (time)) * monkeyColor.r;

    // v.y += monkeyColor.g;
    // v.z += monkeyColor.b;

    gl_Position = worldViewProjection * vec4(v, 1.0);

    vUV = uv;
}
