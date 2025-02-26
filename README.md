# project6
## Requirements:
1. Do the coolest thing you can think of (within a week of work) to a scene with at least one snake in it.
2. You can use glman or the GLSL API -- your choice.
3. You can do your cool things in the vertex shader, the fragment shader, or both.
4. You can use texturing, but don't have to.
5. Your coolness can be shown in an image of the snake, an animation of the snake, or both.
6. You can use displacement mapping, bump-mapping, or both, or neither.
7. The intent of this project is to do something different from what you have done before. Stringing together ellipses, noise, displacement-mapping, bump-mapping, and cube-mapping using the code you already have will not be worth the full points. Stringing together example code from the notes will not be worth the full points.
8. It is OK to use this project to create an early prototype of what you want to do for your Final Project.

## Getting the Snake OBJ File
Here's how to get one of the snake OBJ files:
Vertices | Triangles | File
-|-|-
3,226 | 6,120 | snake.obj
18,689 | 36,720 | snakeH.obj

Left-click to see what the contents of the OBJ file look like.
Right-click to download it.

They both have surface normal vectors and texture coordinates.

Include it in your GLIB file like this:
`Obj snakeH.obj`

or use it with your C/C++ file like this:
```
// a global variable:
GLuint DL;

. . .

// do this in InitGraphics( ):
DL = glGenLists( 1 );
glNewList( DL, GL_COMPILE );
LoadObjFile( "snakeH.obj" );
glEndList( );

. . .

// do this in Display( ):
glCallList( DL );
```
## Finding out where the (s,t) or (x,y,z) locations are in the model
This CS 457/557 shader, find, helps you identify key parts of objects by their (s,t) or (x,y,z) coordinates: find.glib, find.vert, find.frag. It's useful to isolate certain parts of objects in order to do some effect on them without affecting the rest of the object.
