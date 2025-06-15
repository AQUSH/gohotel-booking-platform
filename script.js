document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.classList.add('hidden'));

            // Validate Name
            const name = contactForm.querySelector('#name');
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }

            // Validate Email
            const email = contactForm.querySelector('#email');
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Subject
            const subject = contactForm.querySelector('#subject');
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            }

            // Validate Message
            const message = contactForm.querySelector('#message');
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Search Form Validation and Handling
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const guests = document.getElementById('guests').value;
            const roomType = document.getElementById('roomType').value;

            // Validate dates
            if (!checkIn || !checkOut) {
                alert('Please select both check-in and check-out dates');
                return;
            }

            // Validate check-out is after check-in
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            if (checkOutDate <= checkInDate) {
                alert('Check-out date must be after check-in date');
                return;
            }

            // Simulate search results
            alert(`Searching for ${roomType} room for ${guests} guests from ${checkIn} to ${checkOut}`);
        });

        // Set minimum date for check-in and check-out
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkIn').min = today;
        document.getElementById('checkOut').min = today;
    }

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((element) => {
        observer.observe(element);
    });
});

// Helper Functions
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
