var ksGL = require("ks-gl-initializer");
// Get A WebGL context
var canvas = document.getElementById("c");
canvas.width = 600;
canvas.height = 600;

var gl = canvas.getContext("experimental-webgl");

// setup a GLSL program
var vertexShader = ksGL.createShaderFromScriptElement(gl, "2d-vertex-shader");
var fragmentShader = ksGL.createShaderFromScriptElement(gl, "2d-fragment-shader");
var program = ksGL.createProgram(gl, [vertexShader, fragmentShader]);
gl.useProgram(program);

// look up where the vertex data needs to go.
var positionLocation = gl.getAttribLocation(program, "a_position");
var timeLocation = gl.getUniformLocation(program, "u_time");

// Create a buffer and put a single clipspace rectangle in
// it (2 triangles)

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
        1.0, -1.0,
        1.0,  1.0]),
    gl.STATIC_DRAW);
gl.enableVertexAttribArray(positionLocation);

gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// draw
var startTime = new Date().getTime();
loop();

function loop(){
    // initialize canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    totalTime = (new Date().getTime() - startTime) /1000 ;

    gl.uniform1f(timeLocation,  totalTime);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if(totalTime > 1.0){
        startTime = new Date().getTime();
    }

    gl.flush();

    request = requestAnimationFrame(loop);
}
