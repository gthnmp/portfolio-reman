import projects from '../../../public/works.json';

const selected = `

<div class="content selection w-screen h-screen grid grid-rows-[auto_1fr] gap-y-24 pb-8">
  <header style="transform:translateX(0%)" class="fill-image p-1 w-max min-h-20 grid grid-flow-col gap-x-2 scroll-auto overflow-visible">
    ${projects
    .map(
      (project) => `
      <div class="selection item-container">
        <img draggable="false" class="selection item-thumbnail" src="${project.src}" alt="${project.alt}"/>
        </div>
      `
      )
      .join('')}
  </header>
  <div class="relative w-screen h-full overflow-hidden main-image-container">
  </div>
</div>

`

export default selected