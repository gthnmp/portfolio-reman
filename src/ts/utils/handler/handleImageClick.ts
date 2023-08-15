
function logImageSource() {
  const thumbnails = document.querySelectorAll('.item-thumbnail');
  const app = document.querySelector('#app') as HTMLDivElement;

  thumbnails.forEach(th => {
    th.addEventListener('click', () => {
      const src = th.getAttribute('src');
      const viewImageContainer = document.createElement('div');
      viewImageContainer.className = 'view-image-container z-50 fixed top-0 w-screen h-screen bg-white flex flex-col-reverse md:flex-row';
      viewImageContainer.innerHTML = `
        <img src="${src}" class="h-1/2 md:h-3/4 w-auto object-contain"  />
        <button class="close-button md:hidden absolute top-0 h-8 px-4">Close</button>
      `;
      app.appendChild(viewImageContainer);

        const closeButton = viewImageContainer.querySelector('.close-button');
        closeButton?.addEventListener('click', () => {
          app.removeChild(viewImageContainer);
        });
        if(window.innerWidth > 768){
          viewImageContainer.addEventListener('click', ()=> {
            app.removeChild(viewImageContainer)
          })

        }
    });
  });
}


export default logImageSource