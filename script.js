// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Update Slide
function updateSlide() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Next Slide
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

// Previous Slide
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

// Reservation Form
document.getElementById('reserveForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("🎉 Table Reserved Successfully!");
  e.target.reset();
});
