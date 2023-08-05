import projects from '../../public/works.json';


const selected = `
<div class="content selection w-full h-full flex flex-col gap-16">
  <header style="transform:translateX(0%)" class="fill-image p-1 w-auto h-20 flex gap-2">
    ${projects
    .map(
      project => `
      <div class="item-container">
        <img class="selection item-thumbnail bg-neutral-900" src="${project.src}" alt="${project.alt}"/>
      </div>
      `
      )
      .join('')}
  </header>
  <main class="w-screen h-screen">
    <div class="h-full w-96 bg-neutral-800">
    </div>
  </main>
</div>`

const about = `
<div class="content w-screen h-screen flex flex-col gap-16">
  <header class="absolute p-4 grid grid-cols-12 grid-rows-1 uppercase font-medium">
  <div class="col-span-3 flex flex-col gap-4 leading-4 text-3xl z-50">
      <p>+62 123 123 123</p>
      <p>raflydz@gmail.com</p>
    </div>
    <div class="col-start-9 col-span-4 text-lg uppercase leading-4 grid grid-cols-2 grid-rows-4 gap-y-1">
      <h1 class="col-start-1">UI / UX Designer</h1> <a class="col-start-2" href="https://www.instagram.com/raflyfdz/">Instagram</a>
      <h1 class="row-start-3">Freelancer</h1> <a class="col-start-2" href="https://www.linkedin.com/in/rafly-fathurrahman-diaz-822288286/">LinkedIn</a>
      <a class="col-start-2" href="https://twitter.com/reinmannnt">Twitter</a>
    </div>
  </header>
  <main id="main" class="w-screen h-screen grid place-items-center text-6xl text-black ">
    <div class="flex flex-col items-center justify-center font-medium uppercase">
      <h1>CATALOGUED</h1>
      <h1>WORKS</h1>
      <h1>Rafly Fathurrahman</h1>
      <h1>C.2023</h1>
    </div>
    </main>
</div>
`

const overview = `
<div class="content w-full h-full p-4 flex flex-col gap-16">
  <header class="grid grid-cols-9 grid-rows-1 text-xs uppercase font-medium leading-4">
    <div>
      <p>OVERVIEW</p>
      <p>14 Images</p>
    </div>
    <div class="col-start-3">
    <p>2018 ━</p>
      <p>Ongoing</p>
    </div>
  </header>
  <main id="main" class="overview-main-layout fill-image py-4 auto-rows-max">
    ${projects
      .map(
        project => `
        <div class="item-container">
        <h1 class="item-title">${project.title}</h1>
          <img class="item-thumbnail" src="${project.src}" alt="${project.alt}">
          </div>
      `
      )
      .join('')}
  </main>
</div>
`;

const routes: { [path: string]: string }  = {
  "/": overview,
  "/about": about,
  "/selected": selected
};

const render = (path: string) => {
  const appElement = document.querySelector('#app');
  
  if (appElement) {
    appElement.classList.add('fade-out');
    setTimeout(() => {
      appElement.innerHTML = routes[path] || '<h1>Not Found</h1>';
      appElement.classList.remove('fade-out');
      setTimeout(() => {
        appElement.classList.add('fade-in');
      }, 0);
    }, 300);
  }

  document.querySelectorAll('[href^="/"]').forEach(link => 
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const { pathname } = new URL(target.href);
      window.history.pushState({ path: pathname }, pathname, pathname);
      render(pathname);
    })
  );
};

window.addEventListener("popstate", (event) => {
  const path = event.state ? event.state.path : window.location.pathname;
  render(path);
});

render(window.location.pathname);

