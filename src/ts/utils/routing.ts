import { main } from "../main";
import { Overview, Selected, About } from "../routes";

const routes: { [path: string]: string }  = {
  "/": Overview,
  "/about": About,
  "/selected": Selected
};

let listenersAdded = false;

const addLinkListeners = () => {
  document.querySelectorAll('[href^="/"]').forEach(link => 
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const { pathname } = new URL(target.href);
      window.history.pushState({ path: pathname }, pathname, pathname);
      render(pathname);
    })
  );

  listenersAdded = true;
};

const render = (path: string) => {
  if (!listenersAdded) {
    addLinkListeners();
  }
  
  const appElement = document.querySelector('#app');
  
  if (appElement) {
    appElement.classList.add('fade-out');
    setTimeout(() => {
      appElement.innerHTML = routes[path] || '<h1>Not Found</h1>';
      appElement.classList.remove('fade-out');
      setTimeout(() => {
        appElement.classList.add('fade-in');
        const canvas = document.querySelector('#gl') as HTMLCanvasElement
        if(canvas){
          console.log('running main');
          console.log(canvas);
          main()
        }
      }, 0);
    }, 300);
  }
};

window.addEventListener("popstate", (event) => {
  const path = event.state ? event.state.path : window.location.pathname;
  render(path);
});

render(window.location.pathname);
