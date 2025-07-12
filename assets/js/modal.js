//Modal của các trang banners, pages-policy, popups, system-notifications, hot-product, new-user, orders,   
// modal.js

// Mở modal bằng ID
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        // Ngăn cuộn trang nền
        document.body.style.overflow = 'hidden';
    }
}

// Đóng modal bằng ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        // Khôi phục cuộn trang
        document.body.style.overflow = '';
    }
}

// Đóng modal khi click ra ngoài hoặc nhấn Esc
document.addEventListener('click', function(event) {
    // Click ra ngoài modal
    const modal = event.target.closest('.modal');
    if (modal && event.target === modal) {
        closeModal(modal.id);
    }
    
    // Click vào nút đóng có class close-modal
    if (event.target.closest('.close-modal')) {
        const modal = event.target.closest('.modal');
        if (modal) closeModal(modal.id);
    }
});

document.addEventListener('keydown', function(event) {
    // Nhấn phím Esc (keyCode 27)
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal:not(.hidden)');
        openModals.forEach(modal => closeModal(modal.id));
    }
});