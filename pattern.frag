varying vec2 vST;
varying vec3 vN;
varying vec3 vL;
varying vec3 vE;
varying vec3 vMC;

uniform float uKa, uKd, uKs;
uniform float uShininess;

const vec3 OBJECTCOLOR   = vec3(1.0, 1.0, 0.0);
const vec3 SPECULARCOLOR  = vec3(1.0, 1.0, 1.0);

float SmoothPulse( float left, float right, float value, float tol ) {
    return smoothstep(left - tol, left + tol, value) - smoothstep(right - tol, right + tol, value);
}

void main() {
    float f = fract(vMC.y * 5.0);
    float stripe = SmoothPulse(0.45, 0.55, f, 0.01);
    vec3 hatchingColor = mix(OBJECTCOLOR, vec3(0.0), stripe);
    
    vec3 Normal = normalize(vN);
    vec3 Light = normalize(vL);
    vec3 Eye = normalize(vE);
    
    vec3 ambient = uKa * hatchingColor;
    float diff = max(dot(Normal, Light), 0.0);
    vec3 diffuse = uKd * diff * hatchingColor;
    
    float spec = 0.0;
    if(diff > 0.0) {
        vec3 ref = normalize(reflect(-Light, Normal));
        float cosphi = max(dot(Eye, ref), 0.0);
        spec = pow(cosphi, uShininess);
    }
    vec3 specular = uKs * spec * SPECULARCOLOR;
    
    vec3 finalColor = ambient + diffuse + specular;
    gl_FragColor = vec4(finalColor, 1.0);
}
