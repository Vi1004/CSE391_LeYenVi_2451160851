function createCart() {
    // Dữ liệu nội bộ (Private data) được đóng gói bảo mật nhờ Closure
    let items = [];
    let activeDiscount = { code: "NONE", value: 0, type: "percentage" };

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const targetItem = items.find(item => item.id === productId);
            if (targetItem) targetItem.quantity = newQuantity;
        },
        
        getTotalRaw() {
            return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },

        applyDiscount(code) {
            const upperCode = code.toUpperCase();
            if (upperCode === "SALE10") {
                activeDiscount = { code: "SALE10", value: 10, type: "percentage" };
            } else if (upperCode === "SALE20") {
                activeDiscount = { code: "SALE20", value: 20, type: "percentage" };
            } else if (upperCode === "FREESHIP") {
                activeDiscount = { code: "FREESHIP", value: 30000, type: "fixed" };
            } else {
                activeDiscount = { code: "NONE", value: 0, type: "percentage" };
            }
        },

        getTotal() {
            const rawTotal = this.getTotalRaw();
            if (activeDiscount.type === "percentage") {
                return rawTotal * (1 - activeDiscount.value / 100);
            } else if (activeDiscount.type === "fixed") {
                const final = rawTotal - activeDiscount.value;
                return final < 0 ? 0 : final;
            }
            return rawTotal;
        },
        
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            activeDiscount = { code: "NONE", value: 0, type: "percentage" };
        },

        printCart() {
            console.log("┌────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm       │ SL │ Đơn giá        │ Tổng         │");
            console.log("├───┼────────────────┼────┼────────────────┼──────────────┤");
            
            items.forEach((item, index) => {
                const stt = (index + 1).toString().padEnd(1);
                const name = item.name.padEnd(14);
                const qty = item.quantity.toString().padEnd(2);
                const price = item.price.toLocaleString().padEnd(14);
                const subTotal = (item.price * item.quantity).toLocaleString().padEnd(12);
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${subTotal} │`);
            });
            
            console.log("├────────────────────────────────────────────────────────┤");
            const raw = this.getTotalRaw();
            const final = this.getTotal();
            if (raw !== final) {
                console.log(`│ Tạm tính: ${raw.toLocaleString() + "đ"} (Mã giảm: ${activeDiscount.code})`.padEnd(57) + "│");
            }
            console.log(`│ Tổng thanh toán: ${final.toLocaleString() + "đ"}`.padEnd(57) + "│");
            console.log("└────────────────────────────────────────────────────────┘");
        }
    };
}

// === CHẠY THỬ NGHIỆM ĐỂ KIỂM TRA (TEST CODE) ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng SL lên 2

cart.printCart();
cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // Kết quả: 4
cart.removeItem(3);
console.log("Sau khi xóa AirPods, Số SP còn:", cart.getItemCount()); // Kết quả: 2