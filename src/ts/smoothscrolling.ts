
let current = 0;
let target = 0;
let isDragging = false;
let startY = 0;
const ease = 0.075;

function lerp (start:number, end:number, t:number){
  return start * (1 - t) + (end * t)
}

function setTransform(element: HTMLElement | null, change: string) {
  if (element) {
    element.style.transform = change;
  }
}

function handleSelectionHeaderAppearance() {
  const selection_header:HTMLHeadElement = document.querySelector('.selection > header')!;
  const item_width: HTMLDivElement = document.querySelector('.selection > header > .item-container')!
  const maximum_x:number = parseFloat(getComputedStyle(selection_header).width) - parseFloat(getComputedStyle(item_width).width)
  
  function smoothScroll (){
    current = lerp(current, target, ease)
    current = parseFloat(current.toFixed(2))
    setTransform(selection_header, `translate3d(${-current}px, 0 ,0)`);
    requestAnimationFrame(smoothScroll);
  }

  const handleWheel = (e:WheelEvent) => {
    e.preventDefault()
    target = Math.min(maximum_x, Math.max(0, target + e.deltaY * 0.5))
  }

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    startY = event.clientX;
    document.body.style.cursor = 'grabbing';
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    const deltaY = (event.clientX - startY!);
    target = Math.min(maximum_x, Math.max(0, target - deltaY * 2.5));
    startY = event.clientX;
  }
  
  function handleMouseUp() {
    isDragging = false;
    document.body.style.cursor = 'default';
  }

  function handleTouchStart(event: TouchEvent) {
    isDragging = true;
    startY = event.touches[0].clientX;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    const deltaY = (event.touches[0].clientX - startY!);
    target = Math.min(maximum_x, Math.max(0, target - deltaY * 2.5));
    startY = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    isDragging = false;
  }
  smoothScroll()
  window.addEventListener('wheel', handleWheel,{passive:false})
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("touchend", handleTouchEnd);
}

const observer = new MutationObserver(handleSelectionHeaderAppearance);

observer.observe(document.body, { childList: true, subtree: true });

handleSelectionHeaderAppearance();