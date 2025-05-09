// script.js

// Smooth scrolling for internal navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
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
    const sectionTop = section.offsetTop - 50;
    if (pageYOffset >= sectionTop) {
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

// Add hover effect for testimonial colors dynamically (if needed)
// Assuming you have testimonials with a class 'testimonial'
const testimonials = document.querySelectorAll('.testimonial');
testimonials.forEach(testimonial => {
  testimonial.addEventListener('mouseenter', () => {
    testimonial.style.color = '#f5d142'; // Gold-like color
  });
  testimonial.addEventListener('mouseleave', () => {
    testimonial.style.color = ''; // Reset color
  });
});