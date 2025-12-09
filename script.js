function openMenu() {
  document.querySelector(".Sidebar").style.display = "flex";
}

function closeMenu() {
  document.querySelector(".Sidebar").style.display = "none";
}
  
document.addEventListener("DOMContentLoaded", () => {     
  const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll("img");
  const slideNavLinks = document.querySelectorAll(".slider-nav a");
  let currentSlide = 0;
  const slideIntervalTime =4000;
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    scrollToCurrentSlide();
  };
      
  const scrollToCurrentSlide = () => {
    slider.scrollLeft = slides[currentSlide].offsetLeft;
    updateSliderNav();
  };
  
  const updateSliderNav = () => {
    slideNavLinks.forEach((link, index) => {
      if (index === currentSlide) {
        link.style.opacity = "1";
      } else {
        link.style.opacity = "0.75";
      }
    });
  };

  updateSliderNav();
  setInterval(nextSlide, slideIntervalTime);

  slideNavLinks.forEach((link, index) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      currentSlide = index;
      scrollToCurrentSlide();
    });
  });
});