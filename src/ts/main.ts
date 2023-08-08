import SmoothScroller from "./utils/smoothscroll";
import observeThumbnails from "./utils/handleintersection";
import render from "./utils/gl/renderer";
import works from '../../public/works.json'
import initGL from "./utils/gl/initGL";

const CACHE_KEY = 'imageCache';

interface ImageCache {
  [src: string]: {
    texture:WebGLTexture,
    aspectRatio:number
  };
}

const imageCache: ImageCache = {};

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


function initialize() {
  const { gl, program } = initGL()
  new SmoothScroller();

  works.forEach(work => {
    preloadTexture(gl as WebGLRenderingContext, work.src)
  })
  
  observeThumbnails((src: string | null) => {
    if (src) {
      const {texture, aspectRatio} = imageCache[src];
      render(gl as WebGLRenderingContext, program as WebGLProgram, texture, aspectRatio);
    }
  }); 
}

const observer: MutationObserver = new MutationObserver(() => {
  initialize();
});

observer.observe(document.body, { childList: true, subtree: true });

function restoreImageCache() {
  const storedCache = localStorage.getItem(CACHE_KEY);
  if (storedCache) {
    const deserializedCache: ImageCache = JSON.parse(storedCache);
    Object.assign(imageCache, deserializedCache);
  }
}

function saveImageCache() {
  const cacheData = {
    data: imageCache,
    version: 1, // Change this if you need to invalidate the cache
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Restore image cache on page load
restoreImageCache();

// Initialize when the page is fully loaded
window.addEventListener('load', initialize);

// Save the image cache before navigating away or closing the page
window.addEventListener('beforeunload', saveImageCache);