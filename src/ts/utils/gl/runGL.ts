import observeThumbnails from "../handleintersection";
import render from "./renderer";
import initGL from "./initGL";
import { preloader, imageCache } from "./preloadTexture";
import initPositionBUffer from "./initPositionBuffer";

export default async function runGL() {
  const canvas = document.getElementById("gl") as HTMLCanvasElement;
  const { gl, program } = initGL(canvas) 
  preloader(gl as WebGLRenderingContext)
  const mainImageContainer:HTMLDivElement = document.querySelector('.main-image-container')!
  
  observeThumbnails((src: string | null) => {
    if (src) {
      const {texture, aspectRatio} = imageCache[src];
      initPositionBUffer(gl as WebGLRenderingContext, program as WebGLProgram, mainImageContainer, aspectRatio)
      render(gl as WebGLRenderingContext, program as WebGLProgram, texture);
    } 
  }); 
}