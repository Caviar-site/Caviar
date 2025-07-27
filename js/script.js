const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevButton = document.querySelector('.carousel-arrow.prev');
const nextButton = document.querySelector('.carousel-arrow.next');
let currentIndex = 0;
let interval;

function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % images.length;
  showSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(prevIndex);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

// Dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  });
});

// Arrows
nextButton.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});
prevButton.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Auto slide
interval = setInterval(nextSlide, 5000);
