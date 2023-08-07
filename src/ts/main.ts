import SmoothScroller from "./utils/smoothscroll";
import observeThumbnails from "./utils/handleintersection";
import render from "./utils/renderer";

function initialize() {
  const projectThumbnails = document.querySelectorAll('.selection.item-thumbnail') as NodeListOf<HTMLImageElement>;

  new SmoothScroller();
  const mainImage = new Image()
  mainImage.src = '/projects/ManCam_01.webp'
  observeThumbnails(projectThumbnails, (src) => {
    if(src){
      console.log(src);
      mainImage.src = src
    }
  });
  mainImage.onload = () => {
    mainImage.style.height = '100%';
    mainImage.style.width = 'auto';
    mainImage.style.objectFit = 'contain';
    
    mainImage.classList.add('main-image');
    
    render(mainImage);
  };
}


const observer = new MutationObserver(() => {
  initialize();
});

observer.observe(document.body, { childList: true, subtree: true });
