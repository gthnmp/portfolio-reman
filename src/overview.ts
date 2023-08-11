import projects from './works.json';

const overview = `
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
`

const container = document.querySelector('.fill-image')
if(container){
  container.innerHTML = overview
}   

