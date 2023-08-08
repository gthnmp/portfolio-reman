function render(gl : WebGLRenderingContext, program: WebGLProgram, texture:WebGLTexture, imageAspectRatio:number) {
  const mainImageContainer:HTMLDivElement = document.querySelector('.main-image-container')!
  const containerHeight = mainImageContainer.offsetHeight
  const objectHeight = containerHeight;
  const objectWidth = containerHeight * imageAspectRatio
  
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
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

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer( positionAttributeLocation, 2, gl.FLOAT, false, 0, 0 )

  gl.bindTexture(gl.TEXTURE_2D, texture);

  var primitiveType = gl.TRIANGLES;
  var new_offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, new_offset, count)
}

export default render