// auth.js - Common JavaScript for authentication pages

document.addEventListener('DOMContentLoaded', function() {
    // ========== Tab Navigation ==========
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => {
            // On register page, go to login page
            if (window.location.pathname.includes('register.html')) {
                window.location.href = 'login.html';
            } 
            // On login page, stay on login
            else {
                loginTab.classList.add('active');
                if (registerTab) registerTab.classList.remove('active');
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('register-form').style.display = 'none';
            }
        });
        
        registerTab.addEventListener('click', () => {
            // On login page, go to register page
            if (window.location.pathname.includes('login.html')) {
                window.location.href = 'register.html';
            }
            // On register page, stay on register
            else {
                if (loginTab) loginTab.classList.remove('active');
                registerTab.classList.add('active');
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('register-form').style.display = 'block';
            }
        });
    }

    // ========== Password Visibility Toggle ==========
    function setupPasswordToggle(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const passwordToggle = document.getElementById(toggleId);
        
        if (passwordInput && passwordToggle) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' 
                    ? 'text' 
                    : 'password';
                
                passwordInput.setAttribute('type', type);
                passwordToggle.innerHTML = type === 'password' 
                    ? '<i class="fas fa-eye"></i>' 
                    : '<i class="fas fa-eye-slash"></i>';
            });
        }
    }

    // Set up toggles for both pages
    setupPasswordToggle('login-password', 'login-toggle');
    setupPasswordToggle('reg-password', 'reg-toggle');

    // ========== Password Strength Meter ==========
    const passwordInput = document.getElementById('reg-password');
    const strengthMeter = document.getElementById('strength-meter');
    
    if (passwordInput && strengthMeter) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password criteria
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            strengthMeter.style.width = `${strength}%`;
            
            // Update color
            if (strength < 50) {
                strengthMeter.style.backgroundColor = '#ef4444';
            } else if (strength < 75) {
                strengthMeter.style.backgroundColor = '#f59e0b';
            } else {
                strengthMeter.style.backgroundColor = '#10b981';
            }
        });
    }

    // ========== Phone Number Validation ==========
    const phone = document.getElementById('phone');
    if (phone) {
        // Chỉ cho phép nhập số
        phone.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            
            // Giới hạn độ dài tối đa 11 ký tự
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11);
            }
        });

        // Giới hạn độ dài 10-11 số
        phone.addEventListener('blur', function() {
            const phone = this.value.trim();
            if (phone.length < 10 || phone.length > 11) {
                alert('Số điện thoại phải có 10 hoặc 11 số!');
                this.focus();
            }
        });
    } // Đóng khối if (phone) ở đây

    // ========== Form Submissions ==========
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Kiểm tra số điện thoại
            if (phone) {
                const phone = phone.value.trim();
                if (phone.length < 10 || phone.length > 11) {
                    alert('Số điện thoại phải có 10 hoặc 11 số!');
                    phone.focus();
                    return;
                }
            }
            
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }
            
            if (!document.getElementById('terms').checked) {
                alert('Vui lòng đồng ý với điều khoản dịch vụ');
                return;
            }
            
            alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
            this.reset();
            
            // Reset strength meter
            if (strengthMeter) {
                strengthMeter.style.width = '0';
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                alert('Vui lòng nhập đầy đủ thông tin đăng nhập');
                return;
            }
            
            alert('Đăng nhập thành công! Chuyển hướng về trang chủ...');
            // In a real app: window.location.href = '/';
        });
    }

    // ========== Mobile Menu ==========
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('#mobile-menu a').forEach(el => el.removeAttribute('aria-current'));
            this.setAttribute('aria-current', 'page');
        });
    });
}); // Đóng DOMContentLoaded



// ======== SELLER REGISTRATION MODULE ========
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có phải trang đăng ký đối tác không
    if (!document.querySelector('.step-indicator')) return;

    // Form navigation
    const steps = document.querySelectorAll('.step');
    const formSections = document.querySelectorAll('.form-section');
    let currentStep = 1;
    
    // Initialize form
    showStep(currentStep);
    
    // Next button click handler
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
                updateStepIndicator();
            }
        });
    });
    
    // Previous button click handler
    document.querySelectorAll('.btn-prev').forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
            updateStepIndicator();
        });
    });
    
    // Show current step
    function showStep(step) {
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`step-${step}`).classList.add('active');
    }
    
    // Update step indicator
    function updateStepIndicator() {
        steps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            if (stepNum < currentStep) {
                step.classList.add('completed');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
            }
        });
    }
    
    // Simple validation for each step
    function validateStep(step) {
        let isValid = true;
        const currentSection = document.getElementById(`step-${step}`);
        const requiredFields = currentSection.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('border-red-500');
                    }
                });
            }
        });
        
        // Additional validation for step 3 (passwords match)
        if (step === 3) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                isValid = false;
                alert('Mật khẩu và xác nhận mật khẩu không khớp');
            }
        }
        
        return isValid;
    }
    
    // File Upload
    const fileUpload = document.getElementById('legal-documents');
    if (fileUpload) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.className = 'hidden';
        fileUpload.appendChild(fileInput);
        
        fileUpload.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                fileInput.click();
            }
        });
        
        fileUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        fileUpload.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        fileUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        function handleFiles(files) {
            const fileList = document.getElementById('file-list');
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // Check file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert(`Tệp ${file.name} vượt quá kích thước cho phép (5MB)`);
                    continue;
                }
                
                // Check file type
                const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    alert(`Tệp ${file.name} không đúng định dạng (chỉ chấp nhận JPG, PNG, PDF)`);
                    continue;
                }
                
                // Create file item
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                fileItem.innerHTML = `
                    <div class="file-item-name">${file.name}</div>
                    <div class="file-item-remove">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </div>
                `;
                
                fileList.appendChild(fileItem);
                
                // Add remove functionality
                fileItem.querySelector('.file-item-remove').addEventListener('click', function() {
                    fileItem.remove();
                });
            }
        }
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBar = this.nextElementSibling.querySelector('.bg-red-600');
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            if (strengthBar) {
                strengthBar.style.width = `${strength}%`;
                
                // Change color based on strength
                if (strength < 50) {
                    strengthBar.classList.remove('bg-green-500', 'bg-yellow-500');
                    strengthBar.classList.add('bg-red-600');
                } else if (strength < 75) {
                    strengthBar.classList.remove('bg-red-600', 'bg-green-500');
                    strengthBar.classList.add('bg-yellow-500');
                } else {
                    strengthBar.classList.remove('bg-red-600', 'bg-yellow-500');
                    strengthBar.classList.add('bg-green-500');
                }
            }
        });
    }
    
    // Form submission
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const terms = document.getElementById('terms');
            
            if (!terms || !terms.checked) {
                alert('Vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật');
                return;
            }
            
            // Collect data for summary
            document.getElementById('summary-fullname').textContent = document.getElementById('fullname').value;
            document.getElementById('summary-position').textContent = document.getElementById('position').value;
            document.getElementById('summary-email').textContent = document.getElementById('email').value;
            document.getElementById('summary-phone').textContent = document.getElementById('phone').value;
            document.getElementById('summary-business-name').textContent = document.getElementById('business-name').value;
            document.getElementById('summary-tax-code').textContent = document.getElementById('tax-code').value;
            document.getElementById('summary-business-type').textContent = document.getElementById('business-type').options[document.getElementById('business-type').selectedIndex].text;
            document.getElementById('summary-business-address').textContent = document.getElementById('business-address').value;
            document.getElementById('summary-username').textContent = document.getElementById('username').value;
            
            // Show success message
            alert('Đơn đăng ký của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
            
            // Reset form and go to step 1
            document.querySelector('form').reset();
            currentStep = 1;
            showStep(currentStep);
            updateStepIndicator();
            
            const fileList = document.getElementById('file-list');
            if (fileList) fileList.innerHTML = '';
        });
    }
});