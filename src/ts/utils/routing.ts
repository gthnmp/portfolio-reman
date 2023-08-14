import runGL from "./gl/runGL";
import SmoothScroller from "./SelectedScroll";
import { Overview, Selected, About } from "../routes";
import OverviewPageSmoothScroll from "./OverviewScroll";

const routes: { [path: string]: string }  = {
  "/": Overview,
  "/about": About,
  "/selected": Selected
};

const overlayElement = document.querySelector('.overlay') as HTMLDivElement;
const appElement = document.querySelector('#app') as HTMLDivElement;

let listenersAdded = false;

let currentPath = window.location.pathname;

const addLinkListeners = () => {
  const links = document.querySelectorAll('[href^="/"]');
  links.forEach(link => 
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const { pathname } = new URL(target.href);
      
      if (pathname !== currentPath) {
        currentPath = pathname;
        
        window.history.pushState({ path: pathname }, pathname, pathname);
        render(pathname);

        links.forEach(link => {
          if (link === target) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });
      }
    })
  );
  
  listenersAdded = true;
};

const render = (path: string) => {
  if (!listenersAdded) {
    addLinkListeners();
  }
  
  appElement.classList.add('fade-out');

  setTimeout(() => {
    overlayElement.classList.add('active');
  }, 250);

  setTimeout(() => {
    appElement.innerHTML = routes[path] || '<h1>Not Found</h1>';
  }, 800);
  
  setTimeout(() => {
    appElement.classList.remove('fade-out');
    overlayElement.classList.remove('active')

    const canvas = document.querySelector('#gl') as HTMLCanvasElement
    const overviewPage = document.querySelector('.overview') as HTMLDivElement
    if(canvas){
      runGL()
      new SmoothScroller() && window.innerWidth > 768
    } else if (overviewPage && (window.innerWidth > 768)){
      new OverviewPageSmoothScroll()
    }
  }, 935);

};

window.addEventListener("popstate", (event) => {
  const path = event.state ? event.state.path : window.location.pathname;
  render(path);
});

render(window.location.pathname);
