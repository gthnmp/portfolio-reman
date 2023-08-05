import projects from '../../public/works.json'

const mainContainer = document.querySelector(".fill-image");

if (mainContainer){
  projects.forEach(project => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
  
    const itemTitle = document.createElement("h1");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = project.title;
  
    const itemThumbnail = document.createElement("img");
    itemThumbnail.classList.add("item-thumbnail");
    itemThumbnail.src = project.src;
    itemThumbnail.alt = project.alt;
  
    itemContainer.appendChild(itemTitle);
    itemContainer.appendChild(itemThumbnail);
  
    mainContainer?.appendChild(itemContainer)
  })
}