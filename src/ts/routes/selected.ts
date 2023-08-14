import projects from '../../../public/works.json';

const selected = 
`
<div class="content selection">
  <canvas id="gl"></canvas>
  <header class="fill-image p-1 w-max z-30 min-h-20 grid grid-flow-col gap-x-1 scroll-auto overflow-visible">
  ${projects
    .map((project, index) => {
      const animationDuration = index % 2 === 0 ? (index + 18) / 18  + 0.75 : (index + 18) / 18 + 0.75;
      return `
        <div style="animation-duration:${animationDuration.toFixed(2)}s" class="selection item-container">
          <img draggable="false" class="selection item-thumbnail" src="${project.src}" alt="${project.alt}"/>
        </div>
      `;
    })
    .join('')}
  
  </header>
  <div class="main-image-container">
    <div class="main-image"></div>
  </div>
</div>
`

export default selected
