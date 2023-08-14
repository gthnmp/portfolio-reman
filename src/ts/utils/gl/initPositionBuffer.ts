export default function initPositionBUffer (gl:WebGLRenderingContext, program:WebGLProgram, container:HTMLDivElement, imageAspectRatio:number){
  const rect = container.getBoundingClientRect();
  const {top, right, bottom, left, width, height} = rect
  
  const baseline = window.innerWidth > 768 ? height : width;
  const objectHeight = window.innerWidth > 768 ? baseline : baseline * ( 1 / imageAspectRatio ); 
  const objectWidth = window.innerWidth > 768 ? baseline * imageAspectRatio : baseline;
   
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  var positions = [
    left, top,
    left, top + objectHeight,
    left+objectWidth,  top + objectHeight,
    left+objectWidth,  top + objectHeight,
    left+objectWidth, top,
    left, top,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer( positionAttributeLocation, 2, gl.FLOAT, false, 0, 0 )
}
