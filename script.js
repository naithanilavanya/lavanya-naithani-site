// Smooth scrolling for internal navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Highlight the active section in the navigation as you scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Adjust offset for smoother highlighting
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
});

// Rotate testimonials every 5 seconds
const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;

function rotateTestimonials() {
  testimonials[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % testimonials.length;
  testimonials[currentIndex].classList.add('active');
}

if (testimonials.length > 0) {
  setInterval(rotateTestimonials, 5000); // Rotate every 5 seconds
}

// Hover effect for testimonials
testimonials.forEach(testimonial => {
  testimonial.addEventListener('mouseenter', () => {
    testimonial.style.transform = 'scale(1.05)'; // Slight zoom-in effect
    testimonial.style.transition = 'transform 0.3s ease-in-out';
  });
  testimonial.addEventListener('mouseleave', () => {
    testimonial.style.transform = 'scale(1)'; // Reset zoom
  });
});
