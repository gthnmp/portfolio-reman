import projects from '../works.json';

const selected = `
  ${projects
  .map(
    (project) => `
    <div class="selection item-container">
      <img draggable="false" class="selection item-thumbnail" src="${project.src}" alt="${project.alt}"/>
    </div>
    `
    )
    .join('')}
`
const container = document.querySelector('.fill-image')
if(container){
  container.innerHTML = selected
}
