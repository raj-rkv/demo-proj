// Amenities functionality

const amenitiesData = [
    {
        icon: 'gym-icon.svg',
        title: 'Modern Gym',
        description: 'State-of-the-art fitness equipment'
    },
    {
        icon: 'pool-icon.svg',
        title: 'Swimming Pool',
        description: 'Temperature controlled pool'
    },
    {
        icon: 'garden-icon.svg',
        title: 'Landscaped Gardens',
        description: 'Beautiful green spaces'
    },
    {
        icon: 'security-icon.svg',
        title: '24/7 Security',
        description: 'Round-the-clock surveillance'
    },
    {
        icon: 'parking-icon.svg',
        title: 'Parking Space',
        description: 'Ample parking facilities'
    },
    {
        icon: 'clubhouse-icon.svg',
        title: 'Club House',
        description: 'Premium recreational facilities'
    }
];

function loadAmenities() {
    const amenitiesGrid = document.querySelector('.amenities-grid');
    if (!amenitiesGrid) return;

    amenitiesGrid.innerHTML = amenitiesData.map(amenity => `
        <div class="amenity-item">
            <div class="amenity-icon">
                <img src="assets/icons/${amenity.icon}" alt="${amenity.title}">
            </div>
            <h3>${amenity.title}</h3>
            <p>${amenity.description}</p>
        </div>
    `).join('');

    // Add animation on scroll
    const amenityItems = document.querySelectorAll('.amenity-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    amenityItems.forEach(item => observer.observe(item));
}

// Add CSS for amenities animations
const style = document.createElement('style');
style.textContent = `
    .amenity-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .amenity-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
