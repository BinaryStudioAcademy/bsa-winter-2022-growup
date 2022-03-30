const animates = document.querySelectorAll('.anim-elem');
window.addEventListener('scroll', animScroll);
function animScroll() {
  animates.forEach((item) => {
    const animItemHeight = item.offsetHeight;

    const animItemOffset = offset(item).top;

    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }
    if (
      pageYOffset > animItemOffset - animItemPoint &&
      pageYOffset < animItemOffset + animItemHeight
    ) {
      item.classList.add('anim-active');
    } else {
      if (!item.classList.contains('anim-no-hide')) {
        item.classList.remove('anim-active');
      }
    }
  });
}
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}
setTimeout(() => {
  animScroll();
}, 300);
