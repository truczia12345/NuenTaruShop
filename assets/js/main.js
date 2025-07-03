document.addEventListener('DOMContentLoaded', function() {
        // ==================== NOTIFICATION FIX ====================
        const notificationIcon = document.getElementById('notification-icon');
        const notificationDropdown = document.getElementById('notification-dropdown');
        const notificationList = document.querySelector('.notification-list');
        const notificationFooter = document.querySelector('.notification-footer');
        const loginRequired = document.getElementById('login-required');
        
        // Giả sử trạng thái đăng nhập (false = chưa đăng nhập)
        let isLoggedIn = false;
        
        // Toggle dropdown when clicking on notification icon
        notificationIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Kiểm tra trạng thái đăng nhập
            if (!isLoggedIn) {
                // Hiển thị thông báo yêu cầu đăng nhập
                loginRequired.classList.remove('hidden');
                notificationList.classList.add('hidden');
                notificationFooter.classList.add('hidden');
            } else {
                // Hiển thị danh sách thông báo
                loginRequired.classList.add('hidden');
                notificationList.classList.remove('hidden');
                notificationFooter.classList.remove('hidden');
            }
            
            notificationDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && !notificationIcon.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
        
        // Mark all as read
        const markAllRead = document.querySelector('.notification-mark-all');
        markAllRead.addEventListener('click', function(e) {
            e.preventDefault();
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            document.querySelector('.notification-count').textContent = '0';
        });
        
        // Close dropdown when clicking on a notification item
        const notificationItems = document.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                
                // Update notification count
                const unreadCount = document.querySelectorAll('.notification-item.unread').length;
                document.querySelector('.notification-count').textContent = unreadCount;
            });
        });
        
        // Login simulation (for demo purposes)
        document.querySelector('.login-btn').addEventListener('click', function(e) {
            e.preventDefault();
            isLoggedIn = true;
            alert("Bạn đã đăng nhập thành công! Đóng thông báo này để tiếp tục.");
            
            // Đóng dropdown và mở lại để hiển thị thông báo
            notificationDropdown.classList.remove('show');
            setTimeout(() => {
                notificationDropdown.classList.add('show');
                loginRequired.classList.add('hidden');
                notificationList.classList.remove('hidden');
                notificationFooter.classList.remove('hidden');
            }, 100);
        });

        // Hàm chung để khởi tạo slider
        function initSlider(config) {
            const {
                trackSelector,
                slideSelector,
                prevBtnSelector,
                nextBtnSelector,
                dotSelector,
                containerSelector,
                autoPlayDelay = 5000
            } = config;
            
            const track = document.querySelector(trackSelector);
            const slides = document.querySelectorAll(slideSelector);
            const prevBtn = document.querySelector(prevBtnSelector);
            const nextBtn = document.querySelector(nextBtnSelector);
            const dots = dotSelector ? document.querySelectorAll(dotSelector) : [];
            const container = document.querySelector(containerSelector);
            
            let currentSlide = 0;
            const slideCount = slides.length;
            let slideInterval;
            
            function updateSlider() {
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Cập nhật dots nếu có
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            function startSlideShow() {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateSlider();
                }, autoPlayDelay);
            }
            
            function pauseSlideShow() {
                clearInterval(slideInterval);
            }
            
            // Sự kiện nút điều hướng
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                    updateSlider();
                    pauseSlideShow();
                    startSlideShow();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateSlider();
                    pauseSlideShow();
                    startSlideShow();
                });
            }
            
            // Sự kiện dots nếu có
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateSlider();
                    pauseSlideShow();
                    startSlideShow();
                });
            });
            
            // Pause on hover
            if (container) {
                container.addEventListener('mouseenter', pauseSlideShow);
                container.addEventListener('mouseleave', startSlideShow);
            }
            
            // Khởi động
            updateSlider();
            startSlideShow();
        }

        // 1. Khởi tạo banner lớn
        initSlider({
            trackSelector: '.slider-track',
            slideSelector: '.slide',
            prevBtnSelector: '.prev-btn',
            nextBtnSelector: '.next-btn',
            dotSelector: '.nav-dot',
            containerSelector: '.slider-container',
            autoPlayDelay: 5000
        });

        // 2. Khởi tạo các banner nhỏ
        const smallBanners = [
            {
                trackSelector: '.banner-grid > :first-child .flex',
                slideSelector: '.banner-grid > :first-child .min-w-full',
                prevBtnSelector: '.banner1-prev',
                nextBtnSelector: '.banner1-next',
                containerSelector: '.banner-grid > :first-child',
                autoPlayDelay: 5000
            },
            {
                trackSelector: '.banner-grid > :last-child .flex',
                slideSelector: '.banner-grid > :last-child .min-w-full',
                prevBtnSelector: '.banner2-prev',
                nextBtnSelector: '.banner2-next',
                containerSelector: '.banner-grid > :last-child',
                autoPlayDelay: 6000
            }
        ];

        smallBanners.forEach(banner => initSlider(banner));
        
        // Flash Sale Countdown Timer
        function updateFlashSaleTimer() {
            // Set the end time for the flash sale (example: 3 days from now)
            const endTime = new Date();
            endTime.setDate(endTime.getDate() + 3); // 3 days from now
            endTime.setHours(23, 59, 59); // 23:59:59
            
            const now = new Date();
            const diff = endTime - now;
            
            if (diff <= 0) {
                // Sale has ended
                document.getElementById('flash-hours').textContent = '00';
                document.getElementById('flash-minutes').textContent = '00';
                document.getElementById('flash-seconds').textContent = '00';
                return;
            }
            
            // Calculate hours, minutes, seconds
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update the timer display
            document.getElementById('flash-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('flash-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('flash-seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initialize and update the timer every second
        updateFlashSaleTimer();
        setInterval(updateFlashSaleTimer, 1000);
        
        // PWA Installation Prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            // Show install button
            console.log('PWA installation available');
        });
    });

    // Mobile Menu Toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });

    // Đóng menu khi click bên ngoài
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('mobile-menu');
        const button = document.getElementById('mobile-menu-button');
        
        if (!menu.contains(event.target) && event.target !== button) {
            menu.classList.add('hidden');
        }
    });