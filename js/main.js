// Sayfa yükleme animasyonu
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yükleme animasyonu
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Scroll animasyonları
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // İlk yüklemede kontrol et

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Konum kopyalama özelliği
    const copyButton = document.querySelector('.copy-location');
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const location = copyButton.dataset.location;
            try {
                await navigator.clipboard.writeText(location);
                
                // Başarılı kopyalama mesajı
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="bi bi-check2"></i> Kopyalandı!';
                copyButton.classList.add('copied');
                
                // 2 saniye sonra butonu eski haline getir
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Konum kopyalanamadı:', err);
                alert('Konum kopyalanırken bir hata oluştu.');
            }
        });
    }
}); 