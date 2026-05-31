const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/200x200/png", rating: 4.9 },
    { id: 2, name: "MacBook Pro M3", price: 49990000, category: "laptop", image: "https://placehold.co/200x200/png", rating: 4.8 },
    { id: 3, name: "iPad Air 6", price: 16990000, category: "tablet", image: "https://placehold.co/200x200/png", rating: 4.6 },
    { id: 4, name: "AirPods Pro 2", price: 6190000, category: "accessory", image: "https://placehold.co/200x200/png", rating: 4.7 },
    { id: 5, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/200x200/png", rating: 4.5 },
    { id: 6, name: "Dell XPS 13", price: 38500000, category: "laptop", image: "https://placehold.co/200x200/png", rating: 4.4 },
    { id: 7, name: "Xiaomi Pad 6", price: 8490000, category: "tablet", image: "https://placehold.co/200x200/png", rating: 4.3 },
    { id: 8, name: "Sony WH-1000XM5", price: 7990000, category: "accessory", image: "https://placehold.co/200x200/png", rating: 4.6 },
    { id: 9, name: "Google Pixel 9 Pro", price: 24500000, category: "phone", image: "https://placehold.co/200x200/png", rating: 4.7 },
    { id: 10, name: "Asus ROG Zephyrus G14", price: 42000000, category: "laptop", image: "https://placehold.co/200x200/png", rating: 4.9 },
    { id: 11, name: "Lenovo Tab P12", price: 9200000, category: "tablet", image: "https://placehold.co/200x200/png", rating: 4.2 },
    { id: 12, name: "Keychron K2 V2", price: 1950000, category: "accessory", image: "https://placehold.co/200x200/png", rating: 4.5 }
];

let cartCount = 0;
let activeCategory = "all";
let searchQuery = "";
let activeSort = "none";

const grid = document.querySelector("#productGrid");
const searchBar = document.querySelector("#searchBar");
const sortSelect = document.querySelector("#sortSelect");
const categoryBtns = document.querySelectorAll(".cat-btn");
const cartBadge = document.querySelector("#cartBadge");
const modal = document.querySelector("#productModal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector(".close-modal");

const renderProducts = () => {
    grid.innerHTML = "";
    
    let displayList = products
        .filter(p => activeCategory === "all" || p.category === activeCategory)
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeSort === "priceAsc") displayList.sort((a,b) => a.price - b.price);
    else if (activeSort === "priceDesc") displayList.sort((a,b) => b.price - a.price);
    else if (activeSort === "ratingDesc") displayList.sort((a,b) => b.rating - a.rating);

    displayList.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        
        const img = document.createElement("img");
        img.src = product.image;
        
        const name = document.createElement("h3");
        name.textContent = product.name;
        
        const price = document.createElement("p");
        price.textContent = `${product.price.toLocaleString()} VNĐ`;
        
        const btn = document.createElement("button");
        btn.textContent = "Thêm vào giỏ";
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Ngăn kích hoạt mở Modal khi bấm nút mua
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        card.append(img, name, price, btn);
        
        card.addEventListener("click", () => openProductModal(product));
        grid.appendChild(card);
    });
};

const openProductModal = (product) => {
    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" style="max-width:200px;">
        <p><strong>Danh mục:</strong> ${product.category.toUpperCase()}</p>
        <p><strong>Giá bán:</strong> ${product.price.toLocaleString()} VNĐ</p>
        <p><strong>Đánh giá:</strong> ⭐ ${product.rating}/5.0</p>
    `;
    modal.style.display = "flex";
};

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

searchBar.addEventListener("input", (e) => { searchQuery = e.target.value; renderProducts(); });
sortSelect.addEventListener("change", (e) => { activeSort = e.target.value; renderProducts(); });

categoryBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        activeCategory = e.target.dataset.cat;
        renderProducts();
    });
});

document.querySelector("#darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

renderProducts();