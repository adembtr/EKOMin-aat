// İletişim formu validasyonu ve gönderimi
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });

        // Input alanları için anlık validasyon
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'tel':
                const phoneRegex = /^(?:\+90|90|0)?\d{10}$/;
                isValid = phoneRegex.test(value);
                errorMessage = 'Geçerli bir telefon numarası giriniz.';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'Bu alan zorunludur.';
        }

        this.updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    updateFieldStatus(field, isValid, errorMessage) {
        const errorElement = field.parentElement.querySelector('.error-message');
        
        if (!isValid) {
            field.classList.add('invalid');
            if (!errorElement) {
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = errorMessage;
                field.parentElement.appendChild(error);
            }
        } else {
            field.classList.remove('invalid');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    async submitForm() {
        if (!this.submitButton) return;

        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Gönderiliyor...';

        try {
            const formData = new FormData(this.form);
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                this.showMessage('Mesajınız başarıyla gönderildi!', 'success');
                this.form.reset();
            } else {
                throw new Error('Gönderim başarısız oldu.');
            }
        } catch (error) {
            this.showMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
        } finally {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Gönder';
        }
    }

    showMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;

        this.form.insertAdjacentElement('beforebegin', messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Form validasyonunu başlat
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
}); 