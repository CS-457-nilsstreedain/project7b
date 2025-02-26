varying vec3 vNormal;
varying float vMask;

uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uAmbientColor;
uniform vec3 uScaleColor;
uniform vec3 uGapColor;

void main( )
{
    // Compute basic diffuse lighting.
    float diffuse = max(dot(normalize(vNormal), normalize(uLightDir)), 0.0);
    vec3 lighting = uAmbientColor + uLightColor * diffuse;
    
    // Choose base color based on the mask.
    vec3 baseColor = (vMask > 0.5) ? uScaleColor : uGapColor;
    
    gl_FragColor = vec4(baseColor * lighting, 1.0);
}
