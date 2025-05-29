// Proje galerisi ve filtreleme sistemi
class ProjectGallery {
    constructor() {
        this.gallery = document.querySelector('.project-gallery');
        this.filters = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.project-item');
        this.lightbox = this.createLightbox();
        
        this.init();
    }

    init() {
        // Filtreleme sistemi
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.target.dataset.filter;
                this.filterProjects(category);
                
                // Aktif filtre butonunu güncelle
                this.filters.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Lightbox için proje resimlerine tıklama
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, item.querySelector('.project-title')?.textContent);
                }
            });
        });
    }

    filterProjects(category) {
        this.items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('visible'), 50);
            } else {
                item.classList.remove('visible');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="" alt="">
                <h3 class="lightbox-title"></h3>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Lightbox kapatma
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        // Dışarı tıklayınca kapatma
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        return lightbox;
    }

    openLightbox(imgSrc, title) {
        const lightboxImg = this.lightbox.querySelector('img');
        const lightboxTitle = this.lightbox.querySelector('.lightbox-title');
        
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title || '';
        this.lightbox.classList.add('active');
    }
}

// Galeriyi başlat
document.addEventListener('DOMContentLoaded', () => {
    new ProjectGallery();
}); 