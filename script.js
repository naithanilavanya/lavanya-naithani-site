// Wait for the DOM to load before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    /* Smooth Scrolling for Navigation Links */
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* Rotating Testimonials */
    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonialIndex = 0;

    function rotateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove("active");
        });
        testimonials[currentTestimonialIndex].classList.add("active");
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    }

    // Start rotating testimonials every 5 seconds
    if (testimonials.length > 0) {
        testimonials[currentTestimonialIndex].classList.add("active");
        setInterval(rotateTestimonials, 5000);
    }

    /* Scroll-to-Top Button */
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.innerText = "↑";
    scrollToTopButton.className = "scroll-to-top";
    scrollToTopButton.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.style.display = "none"; // Hide initially

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* Dynamic Active Navigation */
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6 // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                if (navLink) {
                    navLink.classList.add("active");
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    /* Lazy Loading for Blog Images */
    const blogImages = document.querySelectorAll(".blog-post img");
    const lazyLoadOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Start loading when 10% of the image is visible
    };

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-src");
                if (src) {
                    img.setAttribute("src", src);
                    img.removeAttribute("data-src");
                }
                observer.unobserve(img);
            }
        });
    }, lazyLoadOptions);

    blogImages.forEach(img => lazyLoadObserver.observe(img));
});
