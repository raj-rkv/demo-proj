// Popup functionality

function initializePopups() {
    // Create Call Now popup content
    const callPopup = document.getElementById('callPopup');
    callPopup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <h3>Contact Us</h3>
            <form id="callForm">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="phone" placeholder="Your Phone Number" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Your Email" required>
                </div>
                <button type="submit" class="cta-button">Request Callback</button>
            </form>
        </div>
    `;

    // Create WhatsApp popup content
    const whatsappPopup = document.getElementById('whatsappPopup');
    whatsappPopup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <h3>Connect on WhatsApp</h3>
            <form id="whatsappForm">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="phone" placeholder="Your WhatsApp Number" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Your Email" required>
                </div>
                <button type="submit" class="cta-button">Connect Now</button>
            </form>
        </div>
    `;

    // Add event listeners for close buttons
    document.querySelectorAll('.close-popup').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.popup').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle form submissions
    document.getElementById('callForm').addEventListener('submit', handleCallFormSubmit);
    document.getElementById('whatsappForm').addEventListener('submit', handleWhatsappFormSubmit);
}

function handleCallFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this data to your backend
    console.log('Call Form Data:', data);
    
    // Show success message
    showSuccessMessage(e.target, 'We will call you back shortly!');
}

function handleWhatsappFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this data to your backend
    console.log('WhatsApp Form Data:', data);
    
    // Redirect to WhatsApp
    const whatsappNumber = config.whatsappNumber;
    const message = `Hi, I'm ${data.name} and I'm interested in The Wadhwa Courtyard project.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showSuccessMessage(e.target, 'Redirecting to WhatsApp...');
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    form.innerHTML = '';
    form.appendChild(successDiv);
    
    setTimeout(() => {
        form.closest('.popup').classList.remove('active');
        document.body.style.overflow = '';
        // Reset form after popup is closed
        setTimeout(() => {
            form.innerHTML = form.originalHTML;
        }, 300);
    }, 2000);
}

// Store original form HTML for reset
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('#callForm, #whatsappForm');
    forms.forEach(form => {
        form.originalHTML = form.innerHTML;
    });
});
