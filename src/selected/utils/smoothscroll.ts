let current = -10;
let target = -10;
let isDragging = false;
let startY = 0;
const ease = 0.075;
const selectionHeader = document.querySelector('.thumbnail-container') as HTMLDivElement;
const itemWidth = document.querySelector('.thumbnail-container > .item-container:last-child') as HTMLDivElement;
const maximumX = parseFloat(getComputedStyle(selectionHeader).width) - parseFloat(getComputedStyle(itemWidth).width);
console.log(parseFloat(getComputedStyle(selectionHeader).width), 'from', selectionHeader);
console.log(parseFloat(getComputedStyle(itemWidth).width), 'from', itemWidth);

console.log(maximumX);

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + (end * t);
}

function setTransform(element: HTMLElement | null, change: string) {
  if (element) {
    element.style.transform = change;
  }
}

function smoothScroll() {
  current = lerp(current, target, ease);
  current = parseFloat(current.toFixed(2));
  setTransform(selectionHeader, `translate3d(${-current}px, 0 ,0)`);
  requestAnimationFrame(smoothScroll);
}

function handleWheel(e: WheelEvent) {
  e.preventDefault();
  target = target + e.deltaY * 1.;
}

function handleMouseDown(event: MouseEvent) {
  isDragging = true;
  startY = event.clientX;
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging) return;
  const deltaY = event.clientX - startY;
  target = target - deltaY * 1.5;
  startY = event.clientX;
}

function handleMouseUp() {
  isDragging = false;
}

function handleTouchStart(event: TouchEvent) {
  isDragging = true;
  startY = event.touches[0].clientX;
}

function handleTouchMove(event: TouchEvent) {
  if (!isDragging) return;
  const deltaY = event.touches[0].clientX - startY;
  target = target - deltaY * 1.5;
  startY = event.touches[0].clientX;
}

function handleTouchEnd() {
  isDragging = false;
}

function init() {
  smoothScroll();
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('touchend', handleTouchEnd);
}

init();
