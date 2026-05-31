const fields = {
    username: { el: document.querySelector("#username"), valid: false },
    email: { el: document.querySelector("#email"), valid: false },
    password: { el: document.querySelector("#password"), valid: false },
    confirmPassword: { el: document.querySelector("#confirmPassword"), valid: false },
    phone: { el: document.querySelector("#phone"), valid: false }
};

const submitBtn = document.querySelector("#submitBtn");

const setFeedback = (field, isValid, msg) => {
    field.valid = isValid;
    const feedbackSpan = field.el.nextElementSibling.classList.contains("feedback") 
        ? field.el.nextElementSibling 
        : field.el.parentElement.querySelector(".feedback");
    
    if (isValid) {
        field.el.className = "valid";
        feedbackSpan.className = "feedback valid-text";
        feedbackSpan.textContent = msg || "✅ Hợp lệ";
    } else {
        field.el.className = "invalid";
        feedbackSpan.className = "feedback invalid-text";
        feedbackSpan.textContent = msg;
    }
    checkFormValidity();
};

const checkFormValidity = () => {
    const allValid = Object.values(fields).every(f => f.valid);
    submitBtn.disabled = !allValid;
};

fields.username.el.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if(val.length >= 2 && val.length <= 50) setFeedback(fields.username, true);
    else setFeedback(fields.username, false, "Tên phải từ 2 đến 50 ký tự.");
});

fields.email.el.addEventListener("input", (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(e.target.value)) setFeedback(fields.email, true);
    else setFeedback(fields.email, false, "Định dạng Email không hợp lệ.");
});

fields.password.el.addEventListener("input", (e) => {
    const val = e.target.value;
    const progress = document.querySelector("#strengthProgress");
    let score = 0;

    if(val.length >= 8) {
        if(/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
            score = 3; // Mạnh
            progress.style.width = "100%"; progress.style.backgroundColor = "#10b981";
            setFeedback(fields.password, true, "Mật khẩu: Mạnh");
        } else if(/[0-9]/.test(val) && /[a-zA-Z]/.test(val)) {
            score = 2; // Trung bình
            progress.style.width = "66%"; progress.style.backgroundColor = "#eab308";
            setFeedback(fields.password, true, "Mật khẩu: Trung bình");
        } else {
            score = 1; // Yếu nhưng dài đủ 8 kí tự
            progress.style.width = "33%"; progress.style.backgroundColor = "#ef4444";
            setFeedback(fields.password, true, "Mật khẩu: Yếu (Cần thêm số/chữ hoa/ký tự đặc biệt)");
        }
    } else {
        progress.style.width = "15%"; progress.style.backgroundColor = "#ef4444";
        setFeedback(fields.password, false, "Mật khẩu tối thiểu phải từ 8 ký tự.");
    }
    // Trực tiếp kích hoạt check lại confirm password nếu đang gõ dở
    fields.confirmPassword.el.dispatchEvent(new Event('input'));
});

fields.confirmPassword.el.addEventListener("input", (e) => {
    if(e.target.value === fields.password.el.value && e.target.value !== "") {
        setFeedback(fields.confirmPassword, true, "✅ Mật khẩu trùng khớp");
    } else {
        setFeedback(fields.confirmPassword, false, "Mật khẩu xác nhận không khớp.");
    }
});

fields.phone.el.addEventListener("input", (e) => {
    // Tự động định dạng mặt nạ số điện thoại: 0901-234-567
    let num = e.target.value.replace(/\D/g, "");
    if(num.length > 10) num = num.substring(0,10);
    
    let formatted = "";
    if(num.length > 7) {
        formatted = `${num.substring(0,4)}-${num.substring(4,7)}-${num.substring(7)}`;
    } else if(num.length > 4) {
        formatted = `${num.substring(0,4)}-${num.substring(4)}`;
    } else {
        formatted = num;
    }
    e.target.value = formatted;

    if(num.length === 10) setFeedback(fields.phone, true);
    else setFeedback(fields.phone, false, "Số điện thoại phải đủ 10 chữ số.");
});

document.querySelector("#regForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Đăng ký thành công!\nTài khoản: ${fields.username.el.value}\nSĐT: ${fields.phone.el.value}`);
});