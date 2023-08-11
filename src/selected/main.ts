import observeThumbnails from "./utils/handleintersection";
import render from "./utils/gl/renderer";
import works from '../works.json'
import initGL from "./utils/gl/initGL";
import { preloadTexture, imageCache } from "./utils/gl/preloadTexture";
import initPositionBUffer from "./utils/gl/initPositionBuffer";

function runGL(gl: WebGLRenderingContext, program:WebGLProgram) {
  const mainImageContainer:HTMLDivElement = document.querySelector('.main-image-container')!
  observeThumbnails((src: string | null) => {
    if (src) {
      const {texture, aspectRatio} = imageCache[src];
      initPositionBUffer(gl as WebGLRenderingContext, program as WebGLProgram, mainImageContainer, aspectRatio)
      render(gl as WebGLRenderingContext, program as WebGLProgram, texture);
    }
  }); 
}

const main = () => {
  const canvas = document.getElementById("gl") as HTMLCanvasElement;
  const { gl, program } = initGL(canvas) 
  works.forEach(work => {
    preloadTexture(gl as WebGLRenderingContext, work.src)
  })
  
  runGL(gl as WebGLRenderingContext, program as WebGLProgram);
}

main()
