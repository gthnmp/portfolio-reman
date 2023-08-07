export function handleIntersection(entries: IntersectionObserverEntry[], mainImageThumbnail: HTMLImageElement) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const src = entry.target.getAttribute('src')!;
      const cachedImage = localStorage.getItem(src);

      if (cachedImage) {
        mainImageThumbnail.src = cachedImage;
      } else {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          mainImageThumbnail.src = src;

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageBase64 = canvas.toDataURL('image/jpeg');
          localStorage.setItem(src, imageBase64);
        };
      }
    }
  });
}

export default function observeThumbnails(thumbnails: NodeListOf<HTMLImageElement>, mainImageThumbnail: HTMLImageElement) {
  const intersectionObserver = new IntersectionObserver(entries => {
    handleIntersection(entries, mainImageThumbnail);
  }, {
    threshold: 0,
    rootMargin: '0px -100% 0px 1px',
  });

  thumbnails.forEach(thumbnail => {
    intersectionObserver.observe(thumbnail);
  });
}
