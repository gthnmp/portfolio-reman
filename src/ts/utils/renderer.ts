
function resizeCanvasToDisplaySize(canvas:HTMLCanvasElement | any){
  const displayHeight = canvas.clientHeight
  const displayWidth = canvas.clientWidth
 
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  return needResize;
}

function render(image : HTMLImageElement) {
  const canvas = document.getElementById("gl") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  const mainImageContainer:HTMLDivElement = document.querySelector('.main-image-container')!
  const containerHeight = mainImageContainer.offsetHeight

  const imageAspectRatio = image.width / image.height
  const objectHeight = containerHeight;
  const objectWidth = containerHeight * imageAspectRatio
  
  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

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
    precision lowp float;
    
    uniform sampler2D u_image;
    
    varying vec2 v_texCoord;

    void main() {
      gl_FragColor = texture2D(u_image, v_texCoord);
      //gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
    }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = createProgram(gl, vertexShader, fragmentShader);

  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord')
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')



  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  var positions = [
    0, 0,
    0, objectHeight,
    objectWidth,  objectHeight,
    objectWidth,  objectHeight,
    objectWidth, 0,
    0, 0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  resizeCanvasToDisplaySize(gl.canvas)

  gl.viewport(0, 0, canvas.width, canvas.height)
  
  gl.clearColor(1, 1, 1, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program)
  
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer( positionAttributeLocation, size, type, normalize, stride, offset )


  const texCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
    1.0, 1.0,
    1.0, 0,0,
    0.0, 1.0,
  ]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(texCoordAttributeLocation)
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0,0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D , texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer( texCoordAttributeLocation, size, type, normalize, stride, offset );

  var primitiveType = gl.TRIANGLES;
  var new_offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, new_offset, count)
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    console.log('shader success');
    return shader;
  }
  console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  throw new Error("Shader compilation failed");
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    console.log(program);
    return program;
  }
  console.error("Program linking failed:", gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  throw new Error("Program linking failed");
}

export default render