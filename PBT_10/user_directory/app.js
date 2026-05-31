// --- 1. API LAYER ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Không thể tải danh sách người dùng.");
        return await res.json();
    },
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Lỗi khi thêm thành viên mới.");
        return await res.json();
    },
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Lỗi khi cập nhật thành viên.");
        return await res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Lỗi khi xóa thành viên.");
        return true;
    }
};

// --- 2. UI LAYER ---
const ui = {
    container: document.querySelector("#userContainer"),
    alertBox: document.querySelector("#alertBox"),
    modal: document.querySelector("#userModal"),
    form: document.querySelector("#userForm"),

    showLoading() {
        this.container.innerHTML = `<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>`;
    },
    showToast(message, type = "success") {
        this.alertBox.innerHTML = `<div class="toast ${type}">${message}</div>`;
        setTimeout(() => this.alertBox.innerHTML = "", 3000);
    },
    renderUsers(usersList) {
        this.container.innerHTML = "";
        if (usersList.length === 0) {
            this.container.innerHTML = "<p>Không tìm thấy thành viên nào phù hợp.</p>";
            return;
        }
        usersList.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>✉️ ${user.email}</p>
                <div class="card-actions">
                    <button class="edit-btn" onclick="handleEdit(${user.id})">Sửa</button>
                    <button class="delete-btn" onclick="handleDelete(${user.id})">Xóa</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
};

// --- 3. CONTROLLER LAYER ---
let localUsers = [];

const loadInitialData = async () => {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showToast(err.message, "error");
    }
};

// Thực hiện Tìm kiếm realtime ở phía Client-side Filter
document.querySelector("#searchUser").addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = localUsers.filter(u => 
        u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

// Quản lý đóng mở Modal
const openModal = (title, id = "", name = "", email = "") => {
    document.querySelector("#modalTitle").textContent = title;
    document.querySelector("#userId").value = id;
    document.querySelector("#fullName").value = name;
    document.querySelector("#userEmail").value = email;
    ui.modal.style.display = "flex";
};

document.querySelector("#openAddModalBtn").addEventListener("click", () => openModal("Thêm Thành Viên Mới"));
document.querySelector(".close-btn").addEventListener("click", () => ui.modal.style.display = "none");

// Xử lý Submit Form (Cả Add và Edit)
ui.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.querySelector("#userId").value;
    const name = document.querySelector("#fullName").value;
    const email = document.querySelector("#userEmail").value;
    
    try {
        if (id) {
            // Thực hiện Cập nhật (Update)
            await api.updateUser(id, { name, email });
            localUsers = localUsers.map(u => u.id == id ? { ...u, name, email } : u);
            ui.showToast("Cập nhật thông tin thành viên thành công!");
        } else {
            // Thực hiện Thêm mới (Create)
            const newUser = await api.createUser({ name, email });
            // API giả lập luôn trả về ID 11, ta đổi thành Date.now() để tránh trùng Key cục bộ
            newUser.id = Date.now(); 
            localUsers.unshift(newUser);
            ui.showToast("Thêm thành viên mới thành công!");
        }
        ui.renderUsers(localUsers);
        ui.modal.style.display = "none";
    } catch (err) {
        ui.showToast(err.message, "error");
    }
});

window.handleEdit = (id) => {
    const user = localUsers.find(u => u.id === id);
    if (user) openModal("Sửa Thông Tin Thành Viên", user.id, user.name, user.email);
};

window.handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) return;
    try {
        await api.deleteUser(id);
        localUsers = localUsers.filter(u => u.id !== id);
        ui.renderUsers(localUsers);
        ui.showToast("Xóa thành viên khỏi hệ thống thành công!");
    } catch (err) {
        ui.showToast(err.message, "error");
    }
};

// Chạy ứng dụng
loadInitialData();