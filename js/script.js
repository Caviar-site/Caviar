const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevButton = document.querySelector('.carousel-arrow.prev');
const nextButton = document.querySelector('.carousel-arrow.next');
const carouselImages = document.querySelector('.carousel-images');
const creditEl = document.querySelector('.carousel-credit');

let currentIndex = 0;
let interval;

function updateSlidePosition() {
  const width = carouselImages.clientWidth;
  carouselImages.style.transform = `translateX(-${currentIndex * width}px)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

// Modifie showSlide pour appeler updateCredit
function showSlide(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  updateSlidePosition();
  updateCredit(currentIndex);
}

// Appelle updateCredit au démarrage
updateCredit(currentIndex);

function showSlide(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  updateSlidePosition();
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

// Navigation via dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  });
});

// Navigation via arrows
nextButton.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});
prevButton.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Autoplay
interval = setInterval(nextSlide, 5000);

// Swipe detection
let startX = 0;
let isSwiping = false;

carouselImages.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isSwiping = true;
  clearInterval(interval); // pause autoplay while swiping
});

carouselImages.addEventListener('touchmove', e => {
  if (!isSwiping) return;
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX;
  // On déplace temporairement le carousel selon le doigt
  carouselImages.style.transition = 'none';
  const width = carouselImages.clientWidth;
  carouselImages.style.transform = `translateX(${ -currentIndex * width + diffX }px)`;
});

carouselImages.addEventListener('touchend', e => {
  if (!isSwiping) return;
  isSwiping = false;
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;
  const width = carouselImages.clientWidth;
  carouselImages.style.transition = 'transform 0.6s ease-in-out';

  if (diffX > width / 4) {
    prevSlide();
  } else if (diffX < -width / 4) {
    nextSlide();
  } else {
    // revient à la slide courante
    updateSlidePosition();
  }
  resetInterval();
});

// Zoom on click/double-click
let zoomOverlay = null;

function createZoomOverlay() {
  zoomOverlay = document.createElement('div');
  zoomOverlay.classList.add('carousel-zoom-overlay');
  zoomOverlay.addEventListener('click', () => {
    zoomOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  document.body.appendChild(zoomOverlay);
}

function zoomImage(src) {
  if (!zoomOverlay) createZoomOverlay();
  zoomOverlay.innerHTML = `<img src="${src}" alt="Zoomed image">`;
  zoomOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

images.forEach(img => {
  img.addEventListener('dblclick', () => zoomImage(img.src));
  img.addEventListener('click', () => zoomImage(img.src));
});

// Keyboard navigation
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    nextSlide();
    resetInterval();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
    resetInterval();
  }
});

// Initial position update
window.addEventListener('resize', updateSlidePosition);
updateSlidePosition();



// Header disparition rapide au scroll
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 50) {
    // scroll vers le bas -> cacher le header
    header.classList.add('scrolled');
  } else {
    // scroll vers le haut -> afficher le header
    header.classList.remove('scrolled');
  }
  lastScrollY = window.scrollY;
});


document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scroll vers le bas + scroll > 50px : cacher header
      header.classList.add('scrolled');
    } else {
      // Scroll vers le haut ou haut de page : afficher header
      header.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  });
});
