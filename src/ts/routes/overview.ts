import projects from '../../../public/works.json';

const overview = `
<div class="overview content w-full h-full p-4 flex flex-col gap-16">
  <header class="grid grid-cols-12 grid-rows-1 text-xs uppercase font-medium leading-4">
    <div>
      <p>OVERVIEW</p>
      <p>${projects.length} Images</p>
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
          <img draggable="false" class="item-thumbnail" src="${project.src}" alt="${project.alt}">
        </div>
      `
      )
      .join('')}
  </main>
</div>
`;

export default overview