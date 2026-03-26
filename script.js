// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        // Prevent scroll on body when mobile menu is open
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight; // Get dynamic header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Handling for the Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a server.
            // For this static landing page, we'll simulate a success.

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation (can be more robust)
            if (!name || !email || !message) {
                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
                formMessage.style.backgroundColor = '#ffe6e6';
                formMessage.style.borderColor = '#CC0000';
                formMessage.textContent = 'Please fill in all fields.';
                return;
            }

            // Simulate API call delay
            formMessage.style.display = 'block';
            formMessage.style.color = '#7b5b48'; /* Accent color */
            formMessage.style.backgroundColor = '#fdf3ed';
            formMessage.style.borderColor = '#7b5b48';
            formMessage.textContent = 'Sending your message...';

            setTimeout(() => {
                // Assuming successful submission
                formMessage.style.color = 'green';
                formMessage.style.backgroundColor = '#e6ffe6';
                formMessage.style.borderColor = '#4CAF50';
                formMessage.textContent = 'Thank you for your message, ' + name + '! We will get back to you shortly.';
                contactForm.reset(); // Clear the form

                // Hide message after some time
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);

            }, 2000); // 2-second delay to simulate network request
        });
    }

    // Optional: Simple scroll animation for sections (fade-in effect)
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, // viewport
        threshold: 0.1, // 10% of the section must be visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = '0'; // Start invisible
        section.style.transform = 'translateY(20px)'; // Start slightly below
        observer.observe(section);
    });

    // Special handling for hero section which should be visible immediately
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

});