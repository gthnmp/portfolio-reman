import SmoothScroller from "./utils/smoothscroll";
import observeThumbnails from "./utils/handleintersection";

function initialize() {
  const mainImageThumbnail = document.querySelector('.main-image') as HTMLImageElement;
  const projectThumbnails = document.querySelectorAll('.selection.item-thumbnail') as NodeListOf<HTMLImageElement>;

  new SmoothScroller();
  observeThumbnails(projectThumbnails, mainImageThumbnail);
}

const observer = new MutationObserver(() => {
  initialize();
});

observer.observe(document.body, { childList: true, subtree: true });
