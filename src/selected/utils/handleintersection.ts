export function handleIntersection(entries: IntersectionObserverEntry[]): string | null {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const src = entry.target.getAttribute('src');
      return src;
    }
  }
  return null;
}
export default function observeThumbnails(callback: (src: string | null) => void) {
  const projectThumbnails: NodeListOf<HTMLImageElement> = document.querySelectorAll('.selection.item-thumbnail');

  const intersectionObserver = new IntersectionObserver(entries => {
    const src = handleIntersection(entries);
    if(src){
      callback(src)
    }
  }, {
    threshold: 0,
    rootMargin: '0px -100% 0px 1px',
  });

  projectThumbnails.forEach(thumbnail => {
    intersectionObserver.observe(thumbnail);
  });
}
