import createBuffer from "./createBuffer";
import createProgram from "./createProgram";
import createShader from "./createShader";
import resizeCanvas from "./resizeCanvas";

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;

  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    v_texCoord = a_texCoord;
    vec2 zero_to_one = a_position / u_resolution;
    vec2 clip_space = (zero_to_one * 2.0) - 1.0; 

    gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform sampler2D u_image;

  varying vec2 v_texCoord;

  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
  }
  `;


interface R {
  canvas? : HTMLCanvasElement,
  gl?: WebGLRenderingContext,
  program? : WebGLProgram,
}

const initTexCoordBuffer = (gl : WebGLRenderingContext, program:WebGLProgram) => {
  const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord')
  const texCoordBuffer = createBuffer(gl, new Float32Array([
    0.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
    1.0, 1.0,
    1.0, 0,0,
    0.0, 1.0,
  ]))
  gl.enableVertexAttribArray(texCoordAttributeLocation)
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.vertexAttribPointer( texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0 );
}



export default function initGL(canvas : HTMLCanvasElement): R{
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;

  resizeCanvas(gl.canvas)
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(1.0,1.0,1.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader
  const program = createProgram(gl, vertexShader, fragmentShader) as WebGLProgram
    
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  
  initTexCoordBuffer(gl, program)
  
  gl.useProgram(program)
  return {
    canvas, gl, program
  }
}
