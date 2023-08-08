export default function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
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
