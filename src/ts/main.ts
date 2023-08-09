import SmoothScroller from "./utils/smoothscroll";
import observeThumbnails from "./utils/handleintersection";
import render from "./utils/gl/renderer";
import works from '../../public/works.json'
import initGL from "./utils/gl/initGL";
import { preloadTexture, imageCache } from "./utils/gl/preloadTexture";
import initPositionBUffer from "./utils/gl/initPositionBuffer";

function initialize() {
  const mainImageContainer:HTMLDivElement = document.querySelector('.main-image-container')!
  const { gl, program } = initGL() 
  new SmoothScroller();

  works.forEach(work => {
    preloadTexture(gl as WebGLRenderingContext, work.src)
  })
  
  observeThumbnails((src: string | null) => {
    if (src) {
      const {texture, aspectRatio} = imageCache[src];
      initPositionBUffer(gl as WebGLRenderingContext, program as WebGLProgram, mainImageContainer, aspectRatio)
      render(gl as WebGLRenderingContext, program as WebGLProgram, texture);
    }
  }); 
}

const observer: MutationObserver = new MutationObserver(() => {
  initialize();
});

observer.observe(document.body, { childList: true, subtree: true });
