import observeThumbnails from "../handleintersection";
import render from "./renderer";
import works from '../../../../public/works.json'
import initGL from "./initGL";
import { preloadTexture, imageCache } from "./preloadTexture";
import initPositionBUffer from "./initPositionBuffer";

export default function runGL() {
  const canvas = document.getElementById("gl") as HTMLCanvasElement;
  const { gl, program } = initGL(canvas) 
  works.forEach(work => {
    preloadTexture(gl as WebGLRenderingContext, work.src)
  })
  const mainImageContainer:HTMLDivElement = document.querySelector('.main-image-container')!
  observeThumbnails((src: string | null) => {
    if (src) {
      const {texture, aspectRatio} = imageCache[src];
      initPositionBUffer(gl as WebGLRenderingContext, program as WebGLProgram, mainImageContainer, aspectRatio)
      render(gl as WebGLRenderingContext, program as WebGLProgram, texture);
    } 
  }); 
}
