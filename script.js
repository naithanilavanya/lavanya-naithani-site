document.addEventListener("DOMContentLoaded", () => {
    /* Smooth Scrolling for Navigation Links */
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.getElementById(targetId.substring(1));
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    /* Progress Bar */
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    /* Rotating Testimonials */
    const testimonials = document.querySelectorAll(".testimonial");
    let currentIndex = 0;

    function rotateTestimonials() {
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove("active");
        });

        if (testimonials.length > 0) {
            testimonials[currentIndex].classList.add("active");
            testimonials[(currentIndex + 1) % testimonials.length].classList.add("active");
            currentIndex = (currentIndex + 1) % testimonials.length;
        }
    }

    if (testimonials.length > 0) {
        rotateTestimonials(); // Show the first testimonials immediately
        setInterval(rotateTestimonials, 5000);
    }

    /* Scroll-to-Top Button */
    if (!document.querySelector(".scroll-to-top")) {
        const scrollToTopButton = document.createElement("button");
        scrollToTopButton.innerText = "↑";
        scrollToTopButton.className = "scroll-to-top";
        scrollToTopButton.setAttribute("aria-label", "Scroll to top");
        document.body.appendChild(scrollToTopButton);

        scrollToTopButton.style.display = "none"; // Hide initially

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopButton.style.display = "flex";
            } else {
                scrollToTopButton.style.display = "none";
            }
        });

        scrollToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* Dynamic Active Navigation */
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6 // Trigger when 60% of the section is visible
    };

    if ("IntersectionObserver" in window) {
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
    } else {
        console.warn("IntersectionObserver is not supported in this browser.");
    }

    /* Lazy Loading for Blog Images */
    const blogImages = document.querySelectorAll(".blog-post img[data-src]");
    const lazyLoadOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Start loading when 10% of the image is visible
    };

    if ("IntersectionObserver" in window) {
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
    } else {
        console.warn("IntersectionObserver is not supported for lazy loading.");
        blogImages.forEach(img => {
            const src = img.getAttribute("data-src");
            if (src) {
                img.setAttribute("src", src);
                img.removeAttribute("data-src");
            }
        });
    }
});