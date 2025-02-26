varying vec3 vNormal;
varying float vMask;

uniform float uPeriod;
uniform float uScale;
uniform float uBumpHeight;
uniform float uGapDepth;

// SDF for a flat–topped hexagon centered at 0 with inradius r.
float sdHexagon(vec2 p, float r) {
    p = abs(p);
    return max(p.x * 0.866025 + p.y * 0.5, p.y) - r;
}

void main( ) {
    // Get the vertex’s world–space position (assumed to be in world space).
    vec4 worldPos = gl_Vertex;
    vec2 pos = worldPos.xy;
    
    // Compute the Grid Cell Center in World Space
    float rowSpacing = 0.75 * uPeriod;
    float row = floor(pos.y / rowSpacing);
    
    // Stagger alternate rows by half the period.
    float offset = mod(row, 2.0) * (uPeriod / 2.0);
    float col = floor((pos.x - offset) / uPeriod);
    vec2 cellCenter;
    cellCenter.x = col * uPeriod + offset + uPeriod / 2.0;
    cellCenter.y = row * rowSpacing + uPeriod / 2.0;
    
    // Compute Local Coordinates Relative to the Cell Center
    vec2 local = pos - cellCenter;
    
    // Determine if the Vertex Is Inside the Scale or in the Gap
    float d = sdHexagon(local, uScale);
    if (d < 0.0)
        vMask = 1.0;  // scale
    else
        vMask = 0.0;  // gap
    
    // Apply Displacement Based on the Decision
    float disp = (vMask > 0.5) ? uBumpHeight : uGapDepth;
    vec4 newPos = gl_Vertex;
    newPos.xyz += gl_Normal * disp;
    
    gl_Position = gl_ModelViewProjectionMatrix * newPos;
    vNormal = normalize(gl_Normal);
}
