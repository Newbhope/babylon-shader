precision mediump float;

varying vec2 vUV;

uniform sampler2D textureSampler;

uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {

    // vec4 t0 = texture2D(textureSampler, gl_TexCoord[0].st);
    // vec4 t1 = texture2D(tex0, gl_TexCoord[0].st);
    // gl_FragColor = mix(t0, t1, t1.a);
    vec3 color = texture2D(textureSampler, vUV).rgb;

    if(color.g > 0.1) {
        gl_FragColor = texture2D(tex0, vUV);
    } else {
        gl_FragColor = texture2D(tex1, vUV);
    }


    // gl_FragColor = vec4(color, 1);
    // gl_FragColor = texture2D(textureSampler, vUV);
}
