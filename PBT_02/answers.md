# PBT_02 - HTML5 FORMS & MEDIA - Biểu mẫu, Validation & Đa phương tiện
# PHẦN A - KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) - Input Types
1. type="text" → Ô nhập văn bản 1 dòng → Không có validation mặc định → Dùng để nhập tên khách hàng, tên sản phẩm
2. type="email" → Ô nhập text, tự kiểm tra có @ và tên miền → Tự động xác thực định dạng email → Dùng cho form đăng ký/đăng nhập.
3. type="password" → Ô nhập text nhưng bị ẩn ký tự thành dấu chấm/sao → Thường kết hợp minlength để bắt buộc độ dài mật khẩu → Dùng để nhập mật khẩu
4. type="number" → Ô nhập số, có nút tăng/giảm → chỉ cho nhập số, dùng min/max để giới hạn khoảng giá trị → Dùng chọn số lượng sản phẩm muốn mua
5. type="tel" → Ô nhập số điện thoại, trên mobile sẽ hiện bàn phím số → Không tự validate định dạng, nhưng kết hợp với pattern để kiểm tra số điện thoại → Nhập số điện thoại
6. type="date" → Hiển thị bảng lịch để chọn ngày tháng năm → Tự động định dạng ngày/tháng/năm, dùng min,max để giới hạn ngày → Dùng để chọn ngày hoặc nhập ngày sinh
7. type="range" → Hiển thị thanh trượt (slider) → Trả về giá trị số trong khoảng min-max → Dùng cho bộ lọc tìm kiếm sản phẩm theo khoảng giá tiền
8. type="file" → Nút upload file → Dùng accept để giới hạn định dạng file → Dùng upload ảnh để đánh giá sản phẩm
9. type="search" → Ô tìm kiếm + nút X để xóa nhanh nội dung → Không có validation → Dùng cho thanh tìm kiếm sản phẩm ở đầu trang web 
10. type=radio"→ Nút hình tròn nhỏ, chỉ chọn 1 trong nhiều lựa chọn → Buộc người dùng phải chọn 1 trong các lựa chọn có sẵn → Dùng cho chọn phương thức thanh toán (COD/ chuyển khoản/ tiền mặt)

## Câu A2 (5đ) - Validation Attributes
Khi user bấm Submit cho mỗi trường hợp sau:
1. TH1: <input type="text" required value="">   <!-- User để trống -->
   Dự đoán: Bị chặn -> Vì thuộc tính required bắt buộc không được để trống, trình duyệt sẽ hiện thông báo "Please fill out this field"
2. TH2: <input type="email" value="abc">        <!-- User gõ "abc" -->
   Dự đoán: Bị chặn -> Vì type="email" yêu cầu dữ liệu phải có định dạng địa chỉ email (có @). Chuỗi "abc" thiếu ký tự @ nên sẽ báo lỗi không hợp lệ
3. TH3: <input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->
   Dự đoán: Bị chặn -> Vì giá trị 15 vượt quá giới hạn max="10". Trình duyệt sẽ yêu cầu nhập giá trị nhỏ hơn hoặc bằng 10
4. TH4: <input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->
   Dự đoán: Bị chặn -> Vì yêu cầu dữ liệu phải nhập đúng 10 chữ số nhưng "abc123" chứa chữ cái và chỉ có 6 ký tự nên không hợp lệ
5. TH5: <input type="password" minlength="8" value="123">  <!-- User gõ "123" -->
   Dự đoán: Bị chặn -> Vì thuộc tính minlength="8" yêu cầu tối thiểu 8 ký tự nhưng "123" chỉ có 3 ký tự nên không hợp lệ

## Câu A3 (5đ) - Accessibility
1. `<label for="email">` quan trọng cho người dùng screen reader vì
   * Liên kết định danh: Trình đọc màn hình (Screen Reader) không "nhìn" thấy vị trí vật lý của chữ cạnh ô nhập. Khi dùng cặp for (ở thẻ label) và id (ở thẻ input) giống hệt nhau, trình duyệt tạo ra một liên kết logic. Khi người khiếm thị chuyển tab tới ô input, máy sẽ đọc vang lên: "Email, edit text" thay vì chỉ đọc mỗi "Edit text"
   * Mở rộng vùng tương tác: label giúp tăng trải nghiệm cho cả người dùng bình thường. Khi click chuột vào dòng chữ "Email", con trỏ sẽ tự động nhảy vào ô input. Điều này hữu ích trên thiết bị di động có màn hình nhỏ.
2. Khi nào dùng <fieldset> + <legend>:
   * Khi muốn nhóm các control có liên quan mật thiết với nhau để tạo ra 1 ngữ cảnh chung. Khi có nhiều lựa chọn (Radio/checkbox) thuộc cùng 1 câu hỏi hoặc phân chia các khu vực lớn trong 1 form dài.
   * `<fieldset>`: nhóm các input
     `<legend>`: tiêu đề của nhóm
   * Ví dụ: Khi chọn phương thức thanh toán:
     ```
     <fieldset>
       <legend>Phương thức thanh toán</legend>
       
       <input type="radio" name="pay" id="cod">
       <label for="cod">Thanh toán khi nhận hàng</label>
  
       <input type="radio" name="pay" id="bank">
       <label for="bank">Chuyển khoản</label>
     </fieldset>
     ```
3.
   * `aria-label` dùng khi muốn cung cấp thông tin cho trình đọc màn hình nhưng không muốn hiển thị văn bản đó trên giao diện (vd: các nút bấm có icon)
   * Không nên dùng `aria-label` khi đã có `<label>` vì có thể bị đọc trùng thông tin, gây rối cho screen reader và `aria-label`có độ ưu tiên cao hơn nên khi dùng cả hai thì screen reader sẽ bỏ qua nội dung trong thẻ `<label>`

## Câu A4 (5đ) - Media
1. Thuộc tính `loading="lazy"` trên thẻ `<img>`
  * Giải thích: Đây là kỹ thuật "tải chậm", trình duyệt chỉ tải ảnh khi người dùng cuộn trang đến gần vị trí tấm ảnh đó
  * Cải thiện:
    * Tốc độ tải trang: Giảm dung lượng dữ liệu cần tải ngay lập tức
    * Tiết kiệm băng thông: Nếu người dùng không cuộn xuống cuối trang, trình duyệt sẽ không bao giờ tải những ảnh ở dưới đó
  * Khi nào KHÔNG nên dùng: Khi ảnh trên màn hình đầu (Above the fold), ảnh quan trọng (banner chính, ảnh sản phẩm chính, logo)
2. * Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các loại tệp khác nhau. Khi bạn cung cấp nhiều nguồn, trình duyệt sẽ tự chọn định dạng tốt nhất mà nó có thể đọc được. Nếu định dạng thứ nhất lỗi, nó sẽ thử đến định dạng thứ hai.
   * 3 format video web phổ biến:
     1. mp4: Phổ biến nhất, tương thích mọi trình duyệt
     2. webm: Dung lượng nhẹ, chất lượng cao, tối ưu cho web, do Google phát triển
     3. ogg: Mã nguồn mở, thường dùng làm phương án dự phòng
3. * Thuộc tính `alt` trên `<img>` dùng để:
     * Hiển thị thay thế nếu ảnh bị lỗi không tải được/đường truyền chậm
     * Giúp screen reader đọc cho người khiếm thị
     * Giúp Google Bot hiểu nội dung ảnh
   * Cách viết `alt` tốt cho 3 trường hợp:
     * TH1: Ảnh sản phẩm iPhone 16
        alt="Điện thoại iPhone 16 màu Blue Titan, góc nhìn nghiêng 45 độ, dung lượng 256GB, camera 3 ống kính" (Mô tả chi tiết)
     * TH2: Ảnh trang trí (decorative)
        alt="" (Để trống alt để screen reader biết đây là ảnh không quan trọng và bỏ qua
     * TH3: Ảnh biểu đồ doanh thu Q1/2026
        alt="Biểu đồ cột hiển thị doanh thu Q1/2026, cho thấy mức tăng trưởng 10% so với cùng kỳ năm trước" (Không nên chỉ ghi biểu đồ mà phải tóm tắt thông tin quan trọng nhất mà biểu đồ đó thể hiện)

## Câu A5 (5đ) - So sánh `<figure>` với `<img>`
* Khác nhau:
    * `<img>`: Chỉ dùng để hiển thị ảnh đơn thuần. Thường dùng cho các icon, các ảnh minh họa mà không cần giải thích gì thêm. Đặc điểm: Đơn giản, nhanh gọn
    * `<figure>`: Dùng khi ảnh có ý nghĩa độc lập và cần chú thích, nếu di chuyển khối `<figure>` này sang một vị trí khác (ví dụ: phụ lục), nội dung chính của trang vẫn không bị mất ý nghĩa. Đặc điểm: tăng tính ngữ nghĩa
* Cách 1: Dùng khi ảnh chi mang tính minh họa, không cần đi kèm chú thích, không cần tách riêng thành nội dung độc lập
      Vd: 1. Ảnh icon giỏ hàng
          2. Ảnh logo thương hiệu
* Cách 2: Dùng khi ảnh là nội dung chính, cần chú thích và có thể đứng độc lập
      Vd: 1. Ảnh feedback từ khách hàng
          2. Ảnh báo chí cần có ghi chú nguồn gốc, tác giả ở ngay bên dưới ảnh
  
# PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug Form
* 8 lỗi về validation, accessibility, và best practices
  1. Lỗi 1: Dòng 2 - Input "Tên" không có `<label for="...">`, vi phạm accessibility
     Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`
  2. Lỗi 2: Dòng 4 - Input "email" thiếu thẻ `<label>`, thiếu thuộc tính required và name, vi phạm accessibility
     Sửa: `<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>`
  3. Lỗi 3: Dòng 6-7 - Input "password" thiếu thẻ `<label>`, thiếu thuộc tính minlength, vi phạm accessibility
     Sửa: `<label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" minlength="8" required>`
          `<label for="confirm">Nhập lại mật khẩu:</label> <input type="password" id="confirm" name="confirm" required>`
  4. Lỗi 4: Dòng 9 - Input "Phone" dùng type="text" - Không có validation số điện thoại
     Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>`
  5. Lỗi 5: Dòng 11 - Thẻ `<select>` thiếu `<label>` và thuộc tính name, Accessibility kém
     Sửa: `<label for="city">Thành phố:</label> <select id="city" name="city">...</select>`
  6. Lỗi 6: Dòng 16 - Thẻ `<label>` không bao bọc hoặc liên kết với checkbox
     Sửa: `<label><input type="checkbox" name="agree" required> Tôi đồng ý điều khoản</label>`
  7. Lỗi 7: Dòng 20 - Dùng `<input type="submit">`, best practices hiện nay ưu tiên thẻ `<button>` vì nó chứa icon, định dạng linh hoạt hơn bên trong
     Sửa: `<button type="submit">Gửi</button>`
## Câu C2 (10đ) — Thiết kế chiến lược Validation
1. Viết pattern regex cho CMND/CCCD và Số tài khoản
* **CMND/CCCD (Đúng 12 số):** `pattern="[0-9]{12}"` hoặc pattern="\d{12}"
* **Số tài khoản (10-15 số):** `pattern="[0-9]{10,15}"`
  
2. Giải thích: HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
HTML5 validation **không** đủ an toàn cho ứng dụng ngân hàng vì Xác thực HTML5 (Frontend) chỉ đóng vai trò hỗ trợ trải nghiệm người dùng (UX). Nó giúp người dùng biết họ nhập sai ngay lập tức mà chưa cần gửi dữ liệu đi. Tuy nhiên, nó cực kỳ dễ bị qua mặt. Một người dùng có kiến thức cơ bản về IT có thể nhấn F12, xóa thuộc tính required hoặc pattern trong mã nguồn, hoặc sử dụng các công cụ như Postman để gửi dữ liệu trực tiếp lên máy chủ mà không cần thông qua trình duyệt.

3. Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
* So sánh hai trường dữ liệu: Ví dụ: kiểm tra ô "Mật khẩu" và "Nhập lại mật khẩu" có trùng khớp với nhau không.
* Kiểm tra dữ liệu tồn tại/Trùng lặp: Ví dụ kiểm tra xem "Email" hoặc "Tên đăng nhập" này đã tồn tại trong cơ sở dữ liệu (Database) của hệ thống chưa.
* Kiểm tra logic nghiệp vụ phức tạp/Động: Ví dụ kiểm tra nếu người dùng chọn quốc gia là "Việt Nam" thì ô "Số điện thoại" phải bắt đầu bằng "+84".

4. Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend
 * 1. Dữ liệu rác và sai định dạng (Data Integrity): Kẻ xấu có thể gửi những chuỗi văn bản cực dài hoặc chứa mã độc vào ô "Số tiền", gây tràn bộ nhớ hoặc làm hỏng database của ngân hàng.
 * 2. Tấn công SQL Injection hoặc XSS: Nếu không validate và lọc dữ liệu ở Backend, hacker có thể gửi các câu lệnh SQL thông qua input (ví dụ: ' OR 1=1 --) để đánh cắp toàn bộ danh sách khách hàng hoặc chiếm quyền quản trị.
