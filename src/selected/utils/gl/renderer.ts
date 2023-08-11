  function render(gl : WebGLRenderingContext, program: WebGLProgram, texture:WebGLTexture) {
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    gl.bindTexture(gl.TEXTURE_2D, texture);

    var primitiveType = gl.TRIANGLES;
    var new_offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, new_offset, count)
  }

  export default render