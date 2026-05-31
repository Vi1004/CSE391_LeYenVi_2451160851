let currentPage = 1;
const limit = 20;
const grid = document.querySelector("#imageGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");

// 1. Tự động hóa Lazy Loading cho ảnh bằng IntersectionObserver riêng
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Chuyển từ data-src sang src thực tế để trình duyệt tải về
            img.onload = () => img.style.opacity = "1";
            observer.unobserve(img);
        }
    });
});

const loadMorePhotos = async () => {
    try {
        // Gọi API sử dụng bộ lọc phân trang thực tế từ Lorem Picsum
        const res = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        if (!res.ok) throw new Error("Không thể tải ảnh.");
        
        const photos = await res.json();
        
        photos.forEach(photo => {
            const card = document.createElement("div");
            card.className = "img-card";
            
            const img = document.createElement("img");
            // Đặt sẵn ảnh mẫu phân giải thấp hoặc giữ trống, cấu hình data-src chứa ảnh gốc
            img.dataset.src = `https://picsum.photos/id/${photo.id}/500/400`;
            img.alt = `Photo by ${photo.author}`;
            
            card.appendChild(img);
            grid.appendChild(card);
            
            // Kích hoạt theo dõi tấm ảnh này cho bộ lazy load
            lazyImageObserver.observe(img);

            // Mở Lightbox xem ảnh lớn độ nét cao khi click chuột
            card.addEventListener("click", () => {
                lightboxImg.src = `https://picsum.photos/id/${photo.id}/1000/800`;
                lightbox.style.display = "flex";
            });
        });
        
        currentPage++;
    } catch (err) {
        console.error(err.message);
    }
};

// 2. Cài đặt IntersectionObserver điều hướng Infinite Scroll cho chân trang
const infiniteObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, { rootMargin: "200px" }); // Kích hoạt nạp trước khi người dùng cuộn cách đáy 200px

infiniteObserver.observe(document.querySelector("#load-trigger"));

// Đóng lightbox khi bấm nút đóng hoặc bấm ra ngoài màn hình nền ẩn
document.querySelector(".close-lightbox").addEventListener("click", () => lightbox.style.display = "none");
lightbox.addEventListener("click", (e) => { if(e.target === lightbox) lightbox.style.display = "none"; });