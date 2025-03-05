varying vec2 vST;
varying vec3 vN;
varying vec3 vL;
varying vec3 vE;
varying vec3 vMC;

uniform float uTwist;

const vec3 LIGHTPOSITION = vec3(5.0, 5.0, 0.0);

vec3 RotateX( vec3 xyz, float radians )
{
    float c = cos(radians);
    float s = sin(radians);
    vec3 newxyz = xyz;
    newxyz.yz = vec2(
        dot( xyz.yz, vec2( c, -s) ),
        dot( xyz.yz, vec2( s,  c) )
    );
    return newxyz;
}

void main() {
    vST = gl_MultiTexCoord0.st;
    vMC = gl_Vertex.xyz;
    
    vec4 twistedPos = gl_Vertex;
    float twistAngle = uTwist * gl_Vertex.x;
    twistedPos.xyz = RotateX(gl_Vertex.xyz, twistAngle);
    
    vec4 ECposition = gl_ModelViewMatrix * twistedPos;
    vN = normalize(gl_NormalMatrix * gl_Normal);
    vL = LIGHTPOSITION - ECposition.xyz;
    vE = -ECposition.xyz;
    
    gl_Position = gl_ModelViewProjectionMatrix * twistedPos;
}
