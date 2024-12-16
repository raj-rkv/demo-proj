// Gallery functionality

const galleryData = [
    {
        image: 'gallery-1.jpg',
        caption: 'Exterior View'
    },
    {
        image: 'gallery-2.jpg',
        caption: 'Living Room'
    },
    {
        image: 'gallery-3.jpg',
        caption: 'Master Bedroom'
    },
    {
        image: 'gallery-4.jpg',
        caption: 'Kitchen'
    },
    {
        image: 'gallery-5.jpg',
        caption: 'Bathroom'
    },
    {
        image: 'gallery-6.jpg',
        caption: 'Balcony View'
    }
];

function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = galleryData.map((item, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="assets/images/${item.image}" alt="${item.caption}">
            <div class="gallery-caption">
                <h4>${item.caption}</h4>
            </div>
        </div>
    `).join('');

    // Create lightbox if it doesn't exist
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img id="lightbox-img" src="" alt="">
                <div class="lightbox-caption"></div>
                <button class="lightbox-prev"><</button>
                <button class="lightbox-next">></button>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Add event listeners
        const closeLightbox = document.querySelector('.close-lightbox');
        closeLightbox.addEventListener('click', () => {
            document.getElementById('lightbox').style.display = 'none';
            document.body.style.overflow = '';
        });

        document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });

        document.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    lightboxImg.src = `assets/images/${galleryData[index].image}`;
    lightboxCaption.textContent = galleryData[index].caption;
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryData.length) % galleryData.length;
    openLightbox(currentImageIndex);
}

// Add keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        } else if (e.key === 'Escape') {
            document.getElementById('lightbox').style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});
