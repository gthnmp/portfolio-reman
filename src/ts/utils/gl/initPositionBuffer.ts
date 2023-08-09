export default function initPositionBUffer (gl:WebGLRenderingContext, program:WebGLProgram, container:HTMLDivElement, imageAspectRatio:number){
  const containerHeight = container.offsetHeight
  const objectHeight = containerHeight;
  const objectWidth = containerHeight * imageAspectRatio
   
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


}