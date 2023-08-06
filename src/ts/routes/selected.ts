import projects from '../../../public/works.json';

const selected = `

<div class="content selection w-screen h-screen grid grid-rows-[auto_1fr] gap-y-16">
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
  <div class="relative w-1/3 h-full overflow-hidden main-image-container">
    <img draggable="false" class="main-image h-full absolute bottom-0 left-0 object-contain" src="/works/beehive.webp" alt="kontol"/>
  </div>
</div>

`

export default selected