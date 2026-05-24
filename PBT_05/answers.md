# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 — Viewport & Mobile-First
### 1. Thẻ <meta viewport> chuẩn: 
Tài liệu tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md → 16_sass_scss.md`
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Giải thích từng thuộc tính:
- `name="viewport"`: Khai báo với trình duyệt rằng đây là cấu hình hiển thị cho màn hình thiết bị.
- `content="width=device-width"`: Chiều rộng trang web bằng đúng chiều rộng màn hình thiết bị.
- `initial-scale=1.0`: Mức zoom ban đầu là 100%, không bị thu nhỏ/phóng to.
### 2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13)
Nếu thiếu thẻ viewport, iPhone sẽ coi trang web là web dành riêng cho desktop. Nó sẽ tự động thu nhỏ (zoom out) toàn bộ giao diện lại để vừa khít với màn hình điện thoại, khiến chữ trở nên nhỏ xíu, các nút bấm chồng chéo và người dùng bắt buộc phải dùng tay zoom in để đọc, phải scroll ngang liên tục.
### 3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?
- Mobile-First (Khuyên dùng): Viết CSS mặc định cho màn hình nhỏ (mobile) trước, sau đó dùng các media query tăng dần (min-width) để thêm thắt layout cho màn hình lớn hơn.
- Desktop-First: Viết CSS mặc định cho màn hình lớn (desktop) trước, rồi dùng các media query giảm dần (max-width) để bẻ gãy layout cho vừa màn hình nhỏ
- Ví dụ CSS với breakpoint 768px:
```
/* --- Mobile-First --- */
.container { width: 100%; } /* Mặc định cho Mobile */

@media (min-width: 768px) {
    .container { width: 750px; } /* Cho Tablet trở lên */
}

/* --- Desktop-First --- */
.container { width: 1200px; } /* Mặc định cho Desktop */

@media (max-width: 768px) {
    .container { width: 100%; } /* Cho Mobile và dưới Tablet */
}
```
- Mobile-First được khuyên dùng: Vì điện thoại di động có cấu hình phần cứng yếu hơn và băng thông mạng giới hạn hơn desktop. Khi viết Mobile-First, điện thoại sẽ tải ít mã CSS nhất (chỉ đọc code mặc định, bỏ qua code trong các block min-width lớn), giúp trang tải nhanh hơn, tiết kiệm tài nguyên mạng và tăng hiệu năng.

## Câu A2 (5đ) — Breakpoints
Bảng breakpoints chuẩn theo tài liệu (hệ thống Bootstrap):
| Tên | Kích thước pixel | Thiết bị đại diện | Số cột lưới sản phẩm đề xuất |
|---|---|---|---|
| xs | `< 576px` | Điện thoại dọc (iPhone SE, Portrait phones) | 1 cột (chiếm trọn chiều ngang) |
| sm | `≥ 576px` | Điện thoại ngang (Landscape phones) | 2 cột | 
| md | `≥ 768px` | Máy tính bảng (iPad, Tablets) | 2 cột hoặc 3 cột |
| lg | `≥ 992px` | Máy tính xách tay, Desktop nhỏ (Laptops) | 3 cột hoặc 4 cột |
| xl | `≥ 1200px` | Màn hình máy tính lớn (Large Desktops) | 4 cột |

## Câu A3 (5đ) — Media Queries
| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|--------------------|------------|
| 375px (iPhone SE) | 100% | Nhỏ hơn 576px, nhận thuộc tính mặc định, padding 10px. |
| 600px | 540px | Thỏa mãn min-width: 576px nhưng chưa tới 768px. |
| 800px | 720px | Thỏa mãn min-width: 768px (override lại mức 576px). |
| 1000px | 960px | Thỏa mãn min-width: 992px (override lại mức 768px). |
| 1400px | 1140px | Thỏa mãn mức lớn nhất min-width: 1200px. |

## Câu A4 (5đ) — SCSS Basics
### 1. Variables (Biến): Cho phép lưu trữ các giá trị tái sử dụng nhiều lần (màu sắc, font chữ, độ bo góc) vào một nơi. Thay đổi biến này sẽ cập nhật toàn dự án.
```SCSS
$primary-color: #805ad5;
.button { background-color: $primary-color; }
```
### 2. Nesting (Lồng nhau): Viết mã CSS lồng nhau theo đúng cấu trúc hình cây của HTML, giúp code gọn gàng, tránh lặp lại class cha và sử dụng kí tự & để bám vào class cha.
```
.card {
    border: 1px solid #eee;
    .card__title { font-size: 16px; }
    &:hover { transform: scale(1.02); }
}
```
### 3. Mixins (Hàm CSS tái sử dụng): Gom một cụm thuộc tính CSS hay dùng chung thành một hàm, có thể truyền tham số vào để tái sử dụng ở nhiều nơi.
```
@mixin flex-center {
    display: flex; justify-content: center; align-items: center;
}
.hero-content { @include flex-center; }
```
### 4. @extend / Inheritance (Kế thừa): Cho phép một selector chia sẻ/kế thừa lại toàn bộ các thuộc tính CSS đã được định nghĩa ở một class khác để tránh lặp code.
```
.message-box { padding: 10px; border: 1px solid #ccc; }
.error-box { @extend .message-box; border-color: red; }
```
### Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì để chuyển SCSS → CSS?
-Vì SCSS là preprocessor syntax, trình duyệt chỉ hiểu CSS thuần.
-Cần compile:
SCSS → CSS
-Ví dụ:
  -Live Sass Compiler
  -Sass CLI
  -Webpack/Vite

# PHẦN C — PHÂN TÍCH (20 điểm)
