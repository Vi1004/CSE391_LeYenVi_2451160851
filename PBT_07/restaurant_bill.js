function inHoaDon(danhSachMon, checkCoTip = false) {
    let tongTienGoc = 0;

    // 1. Tính toán chi phí gốc của tất cả các món đặt mua
    for (let i = 0; i < danhSachMon.length; i++) {
        const mon = danhSachMon[i];
        mon.tongMon = mon.gia * mon.soLuong;
        tongTienGoc += mon.tongMon;
    }

    // 2. Phân tích các tầng chính sách giảm giá của nhà hàng
    let phanTramGiam = 0;
    if (tongTienGoc > 1000000) phanTramGiam = 15;
    else if (tongTienGoc > 500000) phanTramGiam = 10;

    // Kiểm tra xem hôm nay có phải là ngày thứ 4 hay không (Wednesday = index 3)
    const homNay = new Date();
    const laThuTu = homNay.getDay() === 3;
    if (laThuTu) {
        phanTramGiam += 5;
    }

    let tienGiamGia = (tongTienGoc * phanTramGiam) / 100;
    let tongSauGiam = tongTienGoc - tienGiamGia;

    // 3. Tính toán các chi phí phát sinh phụ đè lên hóa đơn (VAT, Tip)
    let tienVAT = (tongSauGiam * 8) / 100;
    let tienTip = checkCoTip ? (tongSauGiam * 5) / 100 : 0;
    let tongThanhToan = tongSauGiam + tienVAT + tienTip;

    // 4. In hóa đơn mỹ thuật ra màn hình console định dạng chuẩn
    console.log("╔══════════════════════════════════════════╗");
    console.log("║           HÓA ĐƠN NHÀ HÀNG               ║");
    console.log("╠══════════════════════════════════════════╣");
    
    for (let i = 0; i < danhSachMon.length; i++) {
        const m = danhSachMon[i];
        let dongMon = `║ ${i + 1}. ${m.ten}`.padEnd(16) + `x${m.soLuong}`.padEnd(6) + `@${m.gia / 1000}k`.padEnd(8) + `= ${(m.tongMon).toLocaleString()}đ`.padEnd(12) + "║";
        console.log(dongMon);
    }
    
    console.log("╠══════════════════════════════════════════╣");
    console.log(`║ Tổng cộng:`.padEnd(25) + `${tongTienGoc.toLocaleString()}đ`.padStart(16) + " ║");
    console.log(`║ Giảm giá (${phanTramGiam}%):`.padEnd(25) + `-${tienGiamGia.toLocaleString()}đ`.padStart(16) + " ║");
    console.log(`║ VAT (8%):`.padEnd(25) + `${tienVAT.toLocaleString()}đ`.padStart(16) + " ║");
    console.log(`║ Tip (5%):`.padEnd(25) + `${tienTip.toLocaleString()}đ`.padStart(16) + " ║");
    console.log("╠══════════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:`.padEnd(25) + `${tongThanhToan.toLocaleString()}đ`.padStart(16) + " ║");
    console.log("╚══════════════════════════════════════════╝");
}

// Chạy thử nghiệm thực tế với bộ data mẫu
const orderSample = [
    { ten: "Phở bò", gia: 65000, soLuong: 2 },
    { ten: "Trà đá", gia: 5000, soLuong: 3 },
    { ten: "Bún chả", gia: 55000, soLuong: 1 }
];

inHoaDon(orderSample, true);