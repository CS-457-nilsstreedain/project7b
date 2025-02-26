// This fragment shader uses two distinct colors to clearly differentiate scales and gaps.
// It also applies basic diffuse and ambient lighting.

varying vec3 vNormal;
varying float vMask;  // 1.0 for scale, 0.0 for gap

uniform vec3 uLightDir;      // World–space light direction (normalized)
uniform vec3 uLightColor;    // Diffuse light intensity/color
uniform vec3 uAmbientColor;  // Ambient light contribution

uniform vec3 uScaleColor;    // Color for scales (e.g., light brown)
uniform vec3 uGapColor;      // Color for gaps (e.g., darker)

void main( )
{
    // Compute basic diffuse lighting.
    float diffuse = max(dot(normalize(vNormal), normalize(uLightDir)), 0.0);
    vec3 lighting = uAmbientColor + uLightColor * diffuse;
    
    // Choose base color based on the mask.
    vec3 baseColor = (vMask > 0.5) ? uScaleColor : uGapColor;
    
    gl_FragColor = vec4(baseColor * lighting, 1.0);
}
