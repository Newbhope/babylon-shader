precision highp float;
//do i need to worry about mediump?
//
/* NOTES
gl_TexCoord[0] == vUV
*/

varying vec2 vUV;

uniform sampler2D textureSampler;

uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {

    // gl_FragColor = mix(t0, t1, t1.a);
    vec3 color = texture2D(textureSampler, vUV).rgb;
    vec4 grass = texture2D(tex0, vUV.st);
    vec4 ground = texture2D(tex1, vUV.st);
    float interp = fract(vUV.s);


    //color is on a 0 to 1.0 scale. 1.0 is full color
    if (color.b < 0.5) {
        // gl_FragColor = texture2D(tex0, vUV);
        gl_FragColor = mix(grass, ground, interp);
    } else {
        // gl_FragColor = texture2D(tex1, vUV);
        gl_FragColor = mix(grass, ground, vUV.t);
    }

    // vec3 pct = vec3(vUV.x);

    // vec2 st = vUV.xy;

    // gl_FragColor = mix(grass, ground, pct.r);
    // gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
    // gl_FragColor = mix(grass, ground, vUV.s);
    // (1.0 - interp) * grass + (interp * ground);
}
