// Dữ liệu ảnh mẫu
const images = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500", alt: "Cảnh thiên nhiên núi non vĩ đại (Ảnh 1)" },
    { src: "https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=500", alt: "Biển chiều lãng mạn (Ảnh 2)" },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500", alt: "Rừng thông trong sương mù (Ảnh 3)" }
];

let currentIndex = 0;
let slideshowInterval = null;

const currentImg = document.querySelector("#currentImg");
const thumbs = document.querySelectorAll(".thumb");
const badge = document.querySelector("#slideshowBadge");
const palette = document.querySelector("#commandPalette");
const paletteInput = document.querySelector("#paletteInput");
const commandList = document.querySelector("#commandList");
const commands = Array.from(commandList.querySelectorAll("li"));

// --- 1. CHỨC NĂNG GALLERY ---
const switchImage = (index) => {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    
    currentIndex = index;
    currentImg.src = images[currentIndex].src;
    currentImg.alt = images[currentIndex].alt;
    
    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === currentIndex);
    });
};

const toggleSlideshow = () => {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        badge.textContent = "Slideshow: OFF";
    } else {
        badge.textContent = "Slideshow: ON";
        slideshowInterval = setInterval(() => {
            switchImage(currentIndex + 1);
        }, 2000);
    }
};

// Click đổi ảnh thủ công
thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
        switchImage(Number(thumb.dataset.index));
    });
});

// --- 2. COMMAND PALETTE & FOCUS MANAGEMENT ---
const openPalette = () => {
    palette.style.display = "flex";
    palette.setAttribute("aria-hidden", "false");
    paletteInput.focus();
    paletteInput.value = "";
    filterCommands("");
};

const closePalette = () => {
    palette.style.display = "none";
    palette.setAttribute("aria-hidden", "true");
};

const filterCommands = (query) => {
    let firstVisible = null;
    commands.forEach(cmd => {
        const text = cmd.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            cmd.style.display = "block";
            if (!firstVisible) firstVisible = cmd;
        } else {
            cmd.style.display = "none";
            cmd.classList.remove("selected");
        }
    });
    // Reset selected item về thằng đầu tiên được tìm thấy
    commands.forEach(c => c.classList.remove("selected"));
    if (firstVisible) firstVisible.classList.add("selected");
};

const executeCommand = (cmdCode) => {
    switch (cmdCode) {
        case "theme-dark": document.body.classList.add("dark-mode"); break;
        case "theme-light": document.body.classList.remove("dark-mode"); break;
        case "img-next": switchImage(currentIndex + 1); break;
        case "img-prev": switchImage(currentIndex - 1); break;
        case "slideshow-toggle": toggleSlideshow(); break;
    }
    closePalette();
};

paletteInput.addEventListener("input", (e) => filterCommands(e.target.value));

// --- 3. GLOBAL KEYDOWN SHORTCUTS ---
document.addEventListener("keydown", (e) => {
    const isPaletteOpen = palette.style.display === "flex";

    // Phím nóng mở Command Palette (Ctrl + K)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isPaletteOpen ? closePalette() : openPalette();
        return;
    }

    if (isPaletteOpen) {
        // Xử lý phím khi đang mở Command Palette
        const visibleCmds = commands.filter(c => c.style.display !== "none");
        const currentSelected = visibleCmds.find(c => c.classList.contains("selected"));
        let selectIdx = visibleCmds.indexOf(currentSelected);

        if (e.key === "Escape") {
            closePalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentSelected) currentSelected.classList.remove("selected");
            selectIdx = (selectIdx + 1) % visibleCmds.length;
            visibleCmds[selectIdx].classList.add("selected");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentSelected) currentSelected.classList.remove("selected");
            selectIdx = (selectIdx - 1 + visibleCmds.length) % visibleCmds.length;
            visibleCmds[selectIdx].classList.add("selected");
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentSelected) executeCommand(currentSelected.dataset.cmd);
        }
    } else {
        // Xử lý điều hướng Gallery ngoài màn hình chính
        if (e.key === "ArrowRight") switchImage(currentIndex + 1);
        if (e.key === "ArrowLeft") switchImage(currentIndex - 1);
        if (e.key === " ") { 
            e.preventDefault(); // Chặn hành vi cuộn trang mặc định của Space
            toggleSlideshow(); 
        }
        // Nhấn phím số 1-3 tương ứng với các ảnh 1, 2, 3
        if (["1", "2", "3"].includes(e.key)) {
            switchImage(Number(e.key) - 1);
        }
    }
});

// Click chuột vào option trên Palette cũng chạy lệnh được luôn
commandList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        executeCommand(e.target.dataset.cmd);
    }
});