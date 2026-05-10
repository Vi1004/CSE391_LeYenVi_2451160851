# PHẦN A - KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — 3 Cách nhúng CSS
Tài liệu tham chiếu `CCC_Frontend_2026/tuan_2_css_core/08_introduction_css.md`
**1.Inline CSS (trong thẻ)**
* VD: `<h1 style="color: red; font-size: 24px;">Xin chào</h1>`
* Ưu điểm: Có độ ưu tiên cao nhất, tiện để test/debug, áp dụng nhanh cho 1 phần tử duy nhất mà không cần Selector.
* Nhược điểm: Khó bảo trì, làm code HTML bị rối, không thể tái sử dụng style cho các thẻ khác, vi phạm nguyên tắc tách giao diện và nội dung.
* Khi nào nên dùng: Khi cần debug nhanh hoặc dùng Javascript để thay đổi style trực tiếp
**2. Internal CSS (trong `<style>`)**
* VD:
```
<head>
    <style>
        h1 { color: red; font-size: 24px; }
    </style>
</head>
```
* Ưu điểm: Tất cả style nằm trong 1 file HTML, không cần file CSS riêng, dễ quản lý hơn Inline đối với các trang web đơn lẻ.
* Nhược điểm: Chỉ dùng được cho 1 trang, làm file HTML trở nên quá dài, không tái sử dụng cho nhiều file HTML.
* Khi nào nên dùng: Làm Prototype nhann, các trang web đơn, dự án nhỏ'
**3. External CSS (file riêng)**
* VD:
```HTML
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```CSS
h1 {
    color: green;
    font-size: 40px;
}
```
* Ưu điểm: Chuẩn production, tách biệt hoàn toàn nội dung (HTML) và giao diện (CSS), dễ bảo trì, một file CSS có thể dùng cho hàng nghìn trang HTML, giúp trình duyệt lưu bộ nhớ đệm, tăng tốc độ tải trang. 
* Nhược điểm: Cần thêm 1 yêu cầu HTML để tải file CSS về.
* Khi nào nên dùng: Dự án thực tế và chuyên nghiệp, dự án lớn.
**Câu hỏi thêm:** Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng thì thứ tự ưu tiên là: 
  Inline CSS -> Internal CSS -> External CSS
  Giải thích:
  * CSS hoạt động theo nguyên tắc "Cascading" (Thác nước). Quy tắc nào đọc sau cùng sẽ ghi đè lên quy tắc trước đó, trừ khi có sự khác biệt về độ ưu tiên của Selector.
  * Style "gần" phần tử hơn -> mạnh hơn.
  * Inline nằm ngay trong thẻ -> ưu tiên cao nhất.
## Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả
1. `h1`                           → Chọn: ShopTLU. Vì selector `h1` chọn tất cả thẻ `<h1>` trong trang 
2. `.price`                       → Chọn: 25.990.000đ và 45.990.000đ. Vì `.price` chọn mọi element có class `price`
3. `#app header`                  → Chọn: Toàn bộ nội dung bên trong thẻ `<header>`. Vì chọn thẻ header nằm bên trong phần tử có id="app". 
4. `nav a:first-child`            → Chọn: Home. Vì thẻ `<a>` đầu tiên nằm trong `nav`
5. `.product.featured h2`         → Chọn: MacBook Pro. Vì thẻ `<h2>` nằm bên trong element có cả 2 class là product và featured
6. `article > p`
→ Chọn: Tất cả thẻ `p` là con trực tiếp của `article`:
- "25.990.000đ"
- "Mô tả sản phẩm..."
- "45.990.000đ"
- "Mô tả sản phẩm..."
Vì dấu > chọn các thẻ p là con trực tiếp của article.
7. `a[href="/"]`                  → Chọn: Home. Vì chọn thẻ `<a>` có thuộc tính href chính xác là "/".
8. `.top-bar.dark h1`             → Chọn: ShopTLU. Vì thẻ `h1` nằm trong element có cả 2 class top-bar và dark.
**Ảnh screenshot:**
  <img width="1894" height="560" alt="image" src="https://github.com/user-attachments/assets/ce60b923-dd2b-41d2-953b-157470269c71" />

  
