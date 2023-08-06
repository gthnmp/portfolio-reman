import projects from '../../../public/works.json';


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

export default selected