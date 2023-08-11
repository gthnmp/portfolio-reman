export default function initPositionBUffer (gl:WebGLRenderingContext, program:WebGLProgram, container:HTMLDivElement, imageAspectRatio:number){
  const rect = container.getBoundingClientRect();
  
  const top = rect.top, bottom = rect.bottom;
  const height = bottom - top

  const containerHeight = height
  const objectHeight = containerHeight;
  const objectWidth = containerHeight * imageAspectRatio
   
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  var positions = [
    0, top,
    0, top + objectHeight,
    objectWidth,  top + objectHeight,
    objectWidth,  top + objectHeight,
    objectWidth, top,
    0, top,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer( positionAttributeLocation, 2, gl.FLOAT, false, 0, 0 )


}