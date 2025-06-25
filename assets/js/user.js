// JavaScript chung cho toàn bộ trang user
document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentFrame = document.getElementById('content-frame');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Load content into iframe
            const targetTab = this.getAttribute('data-tab');
            contentFrame.src = `pages/${targetTab}.html`;
        });
    });
    
    // Avatar Upload
    const avatarInput = document.getElementById('avatar-input');
    const avatarPreview = document.getElementById('avatar-preview');
    
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Popup payment methods
    const paymentPopup = document.getElementById('payment-popup');
    const openPopupBtn = document.getElementById('open-payment-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const cancelBtn = document.getElementById('cancel-btn');
    
    if (openPopupBtn) {
        openPopupBtn.addEventListener('click', function() {
            paymentPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closePopup() {
        paymentPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePopup);
    }
    
    paymentPopup.addEventListener('click', function(e) {
        if (e.target === paymentPopup) {
            closePopup();
        }
    });
    
    // Other common scripts...
});