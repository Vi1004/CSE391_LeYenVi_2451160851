# PHẦN A - KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — 3 Cách nhúng CSS
Tài liệu tham chiếu `CCC_Frontend_2026/tuan_2_css_core/08_introduction_css.md`

**1.Inline CSS (trong thẻ)**
* VD: `<h1 style="color: red; font-size: 24px;">Xin chào</h1>`
* Ưu điểm: Có độ ưu tiên cao nhất, tiện để test/debug, áp dụng nhanh cho 1 phần tử duy nhất mà không cần Selector.
* Nhược điểm: Khó bảo trì, làm code HTML bị rối, không thể tái sử dụng style cho các thẻ khác, vi phạm nguyên tắc tách giao diện và nội dung.
* Khi nào nên dùng: Khi cần debug nhanh hoặc dùng Javascript để thay đổi style trực tiếp.
  
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
* Khi nào nên dùng: Làm Prototype nhanh, các trang web đơn, dự án nhỏ.

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

*Giải thích:
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

## Câu A3 (7đ) — Box Model — Tính toán kích thước
Đọc chương 11 (Box Model). Tính kích thước thực tế (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:
***TH1: content-box (mặc định)**
```
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
Ở chế độ này, `width` chỉ tính riêng cho phần nội dung (content), Các phần khác sẽ cộng dồn vào.
→ Chiều rộng hiển thị (tính từ mép ngoài của border bên trái đến mép ngoài của border bên phải) 
= width + paddingx2 + borderx2 = 400px + 20px*2 + 5px*2 = 450px
→ Không gian chiếm trên trang = visible + margin*2 = 450px + 10px*2 = 470px

***TH2: border-box**
```
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
Ở chế độ này, `width` là con số cuối cùng. Padding và Border sẽ lẩn vào bên trong.
→ Chiều rộng hiển thị = width = 400px
→ Kích thước content thực tế = width - paddingx2 - borderx2 = 400px - (20px*2) - (5px*2) = 350px
→ Không gian chiếm trên trang = visible + margin*2 = 400px + 10px*2 = 420px

***TH3: Margin collapse**
```
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Trong CSS, khi hai lề dọc (top và bottom) của hai khối chồng lên nhau tiếp xúc với nhau, chúng sẽ xảy ra hiện tượng "Margin Collapse". Thay vì cộng dồn, trình duyệt sẽ so sánh và chọn giá trị lớn nhất để làm khoảng cách chung. Do đó, 40px > 25px, nên khoảng cách là 40px.

***Nâng cao**
Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = 40px + (-10px) = 30px
(Khi có margin âm trong việc gộp lề, công thức là: giá trị dương lớn nhất + giá trị âm nhỏ nhất.

## Câu A4 (5đ) — Specificity (Độ ưu tiên)
### 1. Tính specificity score (a,b,c)
- Quy ước:
  + a (ID): Các lựa chọn dùng #id.
  + b (class/ attribute/ pseudo-class): Các lựa chọn dùng .class, [type], :hover.
  + c (element): Các lựa chọn dùng thẻ như p, div, h1.
* **Rule A**
```
p { color: black; }
```
-> Specificity: (0, 0, 1)

* **Rule B**
```
.price { color: blue; }
```
-> Specificity: (0, 1, 0)

* **Rule C**
```
#main-price { color: red; }
```
-> Specificity: (1, 0, 0)

* **Rule D**
```
p.price { color: green; }
```
-> Specificity: (0, 1, 1)

### 2. Element sẽ có màu gì?
* Element sẽ có màu đỏ
* Giải thích: Vì ID có độ ưu tiên cao nhất mà rule C có ID nên element sẽ có màu đỏ

### 3. 
* Nếu thêm <p class="price" id="main-price" style="color: orange;">, element có màu cam
* Giải thích: Vì Inline Style có độ ưu tiên cao hơn cả ID Selector. Trong bộ chỉ số, nó nằm ở cột cao hơn cả ID: (1, 0, 0, 0)

### 4. 
* Nếu Rule A thêm !important, element có màu đen.
* Giải thích: Vì `!important` có độ ưu tiên cao hơn cả ID và Inline, trừ khi có rule khác cũng dùng `!important` và có specificity cao hơn.

# PHẦN B - THỰC HÀNH CODE (55 điểm)
## Bài B1 (20đ) — Style trang Profile
* Các loại selectors đã sử dụng:
   * Element Selector: `body`, `header`, `nav`, `footer` (chọn trực tiếp)
   * Class Selector: `.skills-table`, `.active` (chọn qua tên lớp có dấu chấm)
   * Descendant Selector: `nav a`, `.skills-table th` (chọn thẻ nằm bên trong 1 thẻ khác)
   * Pseudo-class Selector: `:hover`, `:nth-child(even)` (chọn trạng thái hoặc vị trí đặc biệt)
   * Universal Selector: * (Áp dụng cho tất cả các phần tử trên trang)
## Bài B2

# PHẦN C — DEBUG & SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug CSS Layout
### 1.Tính chiều rộng thực tế của sidebar và content (content-box!)
* Sidebar: 300px(width) + 20px*2(padding) + 1px*2(border) = 342px
* Content: 660px(width) + 30px*2(padding) + 1px*2(border) = 722px

### 2. Giải thích tại sao layout bị vỡ
Tổng chiều rộng thực tế của 2 khối là: 342px + 722px = 1046px
Mà container chỉ rộng 960px. Vì 1064px > 960px, không gian không đủ để 2 khối nằm cùng 1 hàng, nên trình duyệt buộc phải đẩy khối nằm sau (.content) xuống dòng mới.
