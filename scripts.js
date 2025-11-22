document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const icon = themeToggle?.querySelector('i');

  // Function to set theme
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateIcon(theme);
  }

  // Function to update icon
  function updateIcon(theme) {
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Initialize Theme
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (systemPrefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Toggle Event Listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
  }
  // Carousel Logic
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track?.children || []);
  const dotsContainer = document.getElementById('carouselDots');
  const navLeft = document.getElementById('navLeft');
  const navRight = document.getElementById('navRight');
  const carouselContainer = document.querySelector('.carousel-container');

  if (track && slides.length > 0 && dotsContainer) {
    let currentIndex = 0;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Update dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    // Invisible Navigation
    if (navLeft) {
      navLeft.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (navRight) {
      navRight.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    // Auto-play Logic
    function startAutoPlay() {
      stopAutoPlay(); // Ensure no duplicate intervals
      autoPlayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause on hover
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoPlay);
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Handle window resize
    window.addEventListener('resize', updateCarousel);

    // Start auto-play initially
    startAutoPlay();
  }
});
