let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const itemCount = document.querySelector("#itemCount");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");

const saveAndRender = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
};

const render = () => {
    list.innerHTML = "";
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        if (todo.isEditing) {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.className = "edit-input";
            editInput.value = todo.text;
            li.appendChild(editInput);
            
            // Focus ngay khi chuyển sang chế độ sửa
            setTimeout(() => editInput.focus(), 0);
        } else {
            const span = document.createElement("span");
            span.className = "todo-text";
            span.textContent = todo.text;
            li.appendChild(span);

            const delBtn = document.createElement("button");
            delBtn.className = "delete-btn";
            delBtn.textContent = "❌";
            li.appendChild(delBtn);
        }
        
        list.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
};

// Sử dụng Event Delegation điều phối hành động trong Todo List
list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains("todo-text")) {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
    } else if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
    }
});

list.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("todo-text")) {
        const id = Number(e.target.closest("li").dataset.id);
        todos = todos.map(t => t.id === id ? { ...t, isEditing: true } : t);
        render();
    }
});

list.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("edit-input") && e.key === "Enter") {
        const id = Number(e.target.closest("li").dataset.id);
        const newText = e.target.value.trim();
        if (newText) {
            todos = todos.map(t => t.id === id ? { ...t, text: newText, isEditing: false } : t);
            saveAndRender();
        }
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text, completed: false, isEditing: false });
    input.value = "";
    saveAndRender();
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        render();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveAndRender();
});

// Chạy lần render đầu tiên khi tải trang
render();