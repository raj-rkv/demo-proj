// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');

    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // WhatsApp button functionality
    const whatsappBtn = document.getElementById('whatsappBtn');
    const enquiryPopup = document.getElementById('enquiryPopup');
    const closePopup = document.querySelector('.close-popup');

    if (whatsappBtn && enquiryPopup) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            enquiryPopup.classList.add('active');
        });
    }

    if (closePopup && enquiryPopup) {
        closePopup.addEventListener('click', () => {
            enquiryPopup.classList.remove('active');
        });
    }

    // Form submission
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(enquiryForm);
            console.log('Form submitted:', Object.fromEntries(formData));
            // Here you would typically send the data to your backend
            
            // Show success message
            enquiryForm.innerHTML = '<div class="success-message">Thank you for your enquiry. We will contact you shortly.</div>';
            
            // Close popup after delay
            setTimeout(() => {
                enquiryPopup.classList.remove('active');
                // Reset form
                setTimeout(() => {
                    enquiryForm.innerHTML = `
                        <input type="text" placeholder="Name" required>
                        <input type="tel" placeholder="Phone" required>
                        <input type="email" placeholder="Email" required>
                        <button type="submit">Submit</button>
                    `;
                }, 300);
            }, 2000);
        });
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                nav.classList.remove('active');
            }
        });
    });
});
