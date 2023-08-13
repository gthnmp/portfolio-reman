import works from '../../../../public/works.json'

interface ImageCache {
  [src: string]: {
    texture:WebGLTexture,
    aspectRatio:number
  };
}

export const imageCache: ImageCache = {};

function preloadTexture(gl: WebGLRenderingContext, src: string) {
  const texture = gl.createTexture() as WebGLTexture;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const image = new Image();
  image.src = src;
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    const aspectRatio = image.width / image.height;
    imageCache[src] = { texture, aspectRatio };
  };
}

export function preloader(gl:WebGLRenderingContext){
  works.forEach(work => {
    preloadTexture(gl as WebGLRenderingContext, work.src)
  })
}