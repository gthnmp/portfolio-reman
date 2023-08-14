import projects from '../../../public/works.json';

const overview = `
<div class="overview content w-full h-full p-4 flex flex-col gap-16">
  <header class="hidden md:grid grid-cols-12 grid-rows-1 text-xs uppercase font-medium leading-4">
    <div>
      <div class="line overflow-y-hidden w-max">
        <p>OVERVIEW</p>
      </div>
      <div class="line overflow-y-hidden w-max">
      <p>${projects.length} Images</p>
      </div>
      </div>
      <div class="col-start-3">
      <div class="line overflow-y-hidden w-max">
      <p>2018 ━</p>
      </div>
      <div class="line overflow-y-hidden w-max">
      <p>Ongoing</p>
      </div>
    </div>
  </header>
  <main id="main" class="overview-main-layout fill-image py-4 auto-rows-max">
    ${projects
      .map(
        project => `
        <div class="item-container">
        <h1 class="item-title">${project.title}</h1>
          <img draggable="false" class="item-thumbnail" src="${project.src}" alt="${project.alt}" onclick="console.log('${project.src}')">
        </div>
      `
      )
      .join('')}
  </main>
</div>
`;


export default overview
