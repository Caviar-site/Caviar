const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.carousel-arrow.prev');
const nextButton = document.querySelector('.carousel-arrow.next');
const carouselImages = document.querySelector('.carousel-images');

let currentIndex = 0;
let interval;

function updateSlidePosition() {
  const width = carouselImages.clientWidth;
  carouselImages.style.transform = `translateX(-${currentIndex * width}px)`;
}

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

// Header disparition rapide au scroll (idem)
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScrollY = window.scrollY;
});
