// tabs.js
function initTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Xóa active class từ tất cả các tab
            tabLinks.forEach(t => {
                t.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            });
            
            // Ẩn tất cả nội dung
            tabContents.forEach(c => c.classList.add('hidden'));
            
            // Thêm active class cho tab hiện tại
            this.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            
            // Hiển thị nội dung tương ứng
            const id = this.getAttribute('href');
            document.querySelector(id).classList.remove('hidden');
        });
    });
}

// Khởi tạo tabs khi DOM được tải
document.addEventListener('DOMContentLoaded', initTabs);