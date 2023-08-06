import projects from '../../../public/works.json';

const selected = `
<div class="content selection w-screen h-screen  flex flex-col gap-16">
  <header style="transform:translateX(0%)" class="fill-image p-1 w-max h-20 grid grid-flow-col gap-x-2 scroll-auto overflow-visible">
    ${projects
    .map(
      (project, index) => `
      <div class="selection item-container" data-project-id="${index}">
        <img draggable="false" class="selection item-thumbnail" src="${project.src}" alt="${project.alt}"/>
      </div>
      `
      )
      .join('')}
    ${projects
    .map(
      (project, index) => `
      <div class="selection item-container" data-project-id="${index}">
        <img draggable="false" class="selection item-thumbnail" src="${project.src}" alt="${project.alt}"/>
      </div>
      `
      )
      .join('')}
  </header>
  <main class="w-screen h-full">
    <div class="h-full w-96  main-image-container">
    </div>
  </main>
</div>`



export default selected