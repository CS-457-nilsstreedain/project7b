# project7b
## Introduction
The goal of this project is to twist an OBJ-defined object.

What is twisting anyway? "Twisting" is a rotation about an axis where the angle of rotation is proportional to the distance away from that axis. Half the object is getting a positive twist while the other half is getting a negative twist. (See the video for an example.) Think of twisting a dishrag.
1. The object needs to have per-fragment lighting. Feel free to hardcode numbers for Ka, Kd, Ks, and Shininess.
2. The object also needs to have some sort of "hatching" linework applied procedurally in the fragment shader. (The point of the hatching is to make it easier to see the twisting.) It might be best to key off of s or t, but x, y, or z in model coordinates might work too. The hatching only has to be in one direction. (In the images above, I was experimenting with doing it in two directions. You don't have to do that.) You might re-look at the Stripes, Rings, and Dots noteset.

## Requirements:
1. Read in an OBJ file. The choice of object is up to you. Use your LoadObjFile( ) function to read it in. Put it in a display list.
2. Be sure the OBJ file has surface normals (vn) so that you can light it.
3. Be sure the OBJ file has texture coordinates (vt) so that you can crosshatch it.
4. The twisting can occur about the X, Y, or Z axis, you can pick. Different objects look better twisted in different directions. You have rotate functions below for all three directions.
5. You can implement all 3 directions if you want, but you only have to implement one.
6. You need to animate the twisting. This can be done with keytiming or by using the Time variable (see below).
7. The hatching must be stripe-ish. Ellipses do not count as "hatching".

## Timing Your Scene Animation
1. You can use Keytime animation, or,
2. You can set a constant called something like MS_PER_CYCLE that specifies the number of milliseconds per animation cycle. Then, in your Idle Function, query the number of milliseconds since your program started and turn that into a floating point number between 0. and 1. that indicates how far through the animation cycle you are. So, in Animate( ), you might say:
```
#define MS_PER_CYCLE	10000
. . .
int ms = glutGet( GLUT_ELAPSED_TIME );
ms %= MS_PER_CYCLE;
Time = (float)ms / (float)MS_PER_CYCLE;		// [0.,1.)
```

Then, in Display( ), convert whatever you did into an amount of twisting to apply and send that over to your vertex shader as a uniform variable.

## Setting up the Object Display List:
In InitGraphics( ):
```
glGenLists( 1, &MyObjectList );
glNewList( MyObjectList, GL_COMPILE );
	LoadObjFile( (char *)"dino.obj" );
glEndList( );
```

In Display( ):
```
float twist = ?????;
Pattern.Use( );
Pattern.SetUniformVariable( "uTwist", twist );
glCallList( MyObjectList );
Pattern.UnUse;
```

## How to do the Rotations:
This code goes in the vertex shader:
```
vec3
RotateX( vec3 xyz, float radians )
{
	float c = cos(radians);
	float s = sin(radians);
	vec3 newxyz = xyz;
	newxyz.yz = vec2(
		dot( xyz.yz, vec2( c,-s) ),
		dot( xyz.yz, vec2( s, c) )
	);
	return newxyz;
}

vec3
RotateY( vec3 xyz, float radians )
{
	float c = cos(radians);
	float s = sin(radians);
	vec3 newxyz = xyz;
	newxyz.xz =vec2(
		dot( xyz.xz, vec2( c,s) ),
		dot( xyz.xz, vec2(-s,c) )
	);
	return newxyz;
}

vec3
RotateZ( vec3 xyz, float radians )
{
	float c = cos(radians);
	float s = sin(radians);
	vec3 newxyz = xyz;
	newxyz.xy = vec2(
		dot( xyz.xy, vec2( c,-s) ),
		dot( xyz.xy, vec2( s, c) )
	);
	return newxyz;
}
```

## Suggestions for Hatching:
Get ideas from the Stripes, Rings, and Dots noteset. Some of this might help you. (or not...)
```
in vec2  vST;
in vec3  vMC;

float
SmoothPulse( float left, float right,   float value, float tol )
{
	float t =	smoothstep( left-tol,  left+tol,  value )  -
			smoothstep( right-tol, right+tol, value );
	return t;
}


// in main( ):
	float numin? = int( ??? / ??? );
	float ?c = numin?*??? + ???/2.;
	float tp = SmoothPulse( ???, ???, ???, ??? );

	vec3 myColor = mix( ???, ???, tp );
	vec3 mySpecularColor = vec3( 1.0, 1.0, 1.0 );
	. . .
```

## Grading:
Item | Points
-|-
Using an OBJ file | 10
Correct per-fragment lighting (we look for the bright spot) | 20
Some sort of stripe-ish hatching done procedurally (not a texture, not ellipses) | 30
Some sort of twisting of the object | 10
Animation of the twisting | 30
Extra Credit | 5
Potential Total | 105
