# 🅱️ TRACK A — BOOTSTRAP 5
## PHẦN A — ĐỌC HIỂU (20 điểm)
### Câu A1 (10đ) — Grid System
Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:
```
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | mỗi box 1 dòng | 2 box mỗi dòng | 4 box cùng dòng |
- Vẽ layout:
1. Màn hình nhỏ (< 768px)
```
+-------------+
|    Box 1    |
+-------------+

+-------------+
|    Box 2    |
+-------------+

+-------------+
|    Box 3    |
+-------------+

+-------------+
|    Box 4    |
+-------------+
```
Giải thích: Mỗi box sử dụng col-12 nên chiếm toàn bộ chiều rộng của hàng.
2. Màn hình trung bình (786px - 991px)
```
+-------------+ +-------------+
|    Box 1    | |    Box 2    |
+-------------+ +-------------+

+-------------+ +-------------+
|    Box 3    | |    Box 4    |
+-------------+ +-------------+
```
Giải thích: Mỗi box sử dụng col-md-6 nên chiếm 6/12 cột (50% chiều rộng). Một hàng chứa được 2 box
3. Màn hình lớn (≥ 992px)
```
+---------+ +---------+ +---------+ +---------+
|  Box 1  | |  Box 2  | |  Box 3  | |  Box 4  |
+---------+ +---------+ +---------+ +---------+
```
Giải thích: Mỗi box sử dụng col-lg-3 nên chiếm 3/12 cột (25% chiều rộng). Một hàng chứa được 4 box.
**Câu hỏi thêm:** 
- col-md-6 nghĩa là: Từ màn hình md (≥768px) trở lên: element chiếm 6/12 cột = 50% width.
- Không cần viể col-sm-12 vì Bootstrap mặc định mobile-first. Nếu không khai báo thì mobile tự động full width (12/12).

### Câu A2 (10đ) — Utilities & Components
1. Giải thích class `d-none d-md-block`
- d-none: Ẩn phần tử hoàn toàn ở kích thước màn hình nhỏ nhất (xs < 576px).
- d-md-block: Đổi thuộc tính hiển thị thành display: block từ màn hình cỡ trung (md $\ge$ 768px) trở lên.
=> Phần tử này sẽ ẩn trên mobile (màn hình < 768px) và hiển thị bình thường trên máy tính bảng/desktop (màn hình $\ge$ 768px).
2. Liệt kê 5 spacing utilities (margin/padding):
- mt-3: margin-top đặt theo mức 3 của Bootstrap (mặc định bằng 1rem = 16px).
- px-4: padding-left và padding-right đặt theo mức 4 (mặc định bằng 1.5rem = 24px).
- mb-auto: margin-bottom: auto!important, thường dùng trong flexbox để đẩy các phần tử khác lên trên.
- ms-2: margin-start (tương đương margin-left trong môi trường LTR) đặt theo mức 2 (0.5rem = 8px).
- pb-5: padding-bottom đặt theo mức 5 lớn nhất (3rem = 48px).
3. Sự khác nhau giữa .container, .container-fluid, .container-md:
`.container`: Cung cấp độ rộng cố định (max-width) thay đổi linh hoạt tại mỗi breakpoint (sm, md, lg,...). Có khoảng đệm hai bên và căn giữa trang.
`.container-fluid`: Cố định độ rộng luôn là 100% ở mọi kích thước màn hình, tràn viền toàn bộ viewport.
`.container-md`: Sẽ tràn viền 100% (width: 100%) trên các màn hình nhỏ hơn 768px. Bắt đầu từ breakpoint md ($\ge$ 768px) trở lên, nó hoạt động giống hệt .container (có max-width cố định).

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 (10đ) — Tùy biến Bootstrap
1. Quy trình đổi màu $primary sang #E63946
- Công cụ cần thiết: Node.js, một module bundler (Webpack, Vite, hoặc Parcel) hoặc công cụ biên dịch Sass độc lập (sass).
- Quy trình thực hiện:
    1. Cài đặt Bootstrap qua npm: npm install bootstrap.
    2. Tạo file định kiểu Scss tùy biến của bạn (ví dụ: custom.scss).
    3. Định nghĩa lại biến trước khi import Bootstrap core:
      ```
      // custom.scss
      $primary: #E63946;
      @import "node_modules/bootstrap/scss/bootstrap";
      ```
    4. Biên dịch file custom.scss này ra định dạng file .css thông thường để nhúng vào HTML.
2. Tại sao KHÔNG nên override trực tiếp .btn-primary { background: red; } mà nên dùng SASS variables?
- Vì Mất tính đồng bộ toàn cục: Biến $primary của Bootstrap không chỉ cấu tạo nên .btn-primary mà còn tạo ra các class như .text-primary, .bg-primary, .border-primary, các hiệu ứng hover, focus, và active states. Nếu bạn override thủ công, bạn sẽ phải tự viết lại mã cho tất cả các class liên quan và các hiệu ứng trạng thái đó.
- Phát sinh lỗi giao diện: Khó quản lý độ tương phản màu chữ (accessibility) và làm tăng dung lượng file CSS không cần thiết do ghi đè chồng chéo.

## Câu C2 (10đ) — So sánh
| Tiêu chí | CSS Thuần | Bootstrap |
|-----------|-----------|------------|
| Số dòng CSS cần viết | Nhiều (50-100 dòng) | Rất ít (chỉ viết class vào HTML) |
| Thời gian phát triển | Chậm hơn | Nhanh hơn |
| Khả năng tùy biến | Cao | Trung bình |
| Responsive | Tự code | Có sẵn |
| Kích thước file | Nhẹ | Nặng hơn |

* Nên dùng khi:
  - Cần prototype nhanh
  - Dự án admin panel, dashboard
  - Team nhỏ, không có designer chuyên nghiệp
  - Cần components phức tạp (Modals, Dropdowns, Carousel)
  - Muốn tập trung vào logic hơn là styling
* Không nên dùng khi:
  - Cần thiết kế độc đáo, khác biệt hoàn toàn
  - Dự án nhỏ, chỉ cần vài components đơn giản
  - Muốn học CSS thuần trước
  - Cần performance tối đa (bundle size nhỏ)
