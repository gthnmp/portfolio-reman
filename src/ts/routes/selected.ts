import projects from '../../../public/works.json';

const selected = 
`
<div class="content selection w-screen h-screen grid grid-rows-[auto_1fr] gap-y-24 pb-8">
  <canvas id="gl" class="absolute w-full h-full z-10"></canvas>
  <header style="transform:translateX(0%)" class="fill-image p-1 w-max z-30 min-h-20 grid grid-flow-col gap-x-2 scroll-auto overflow-visible">
  ${projects
    .map((project, index) => {
      const animationDuration = index % 2 === 0 ? (index + 18) / 18  + 0.1 : (index + 17) / 18;
      return `
        <div style="animation-duration:${animationDuration}s" class="selection item-container">
          <img draggable="false" class="selection item-thumbnail" src="${project.src}" alt="${project.alt}"/>
        </div>
      `;
    })
    .join('')}
  
  </header>
  <div class="relative w-screen h-full overflow-hidden main-image-container">
  </div>
</div>
`

export default selected