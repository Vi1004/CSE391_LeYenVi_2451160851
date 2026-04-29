# PBT_01
# PHẦN A - KIỂM TRA ĐỌC HIỂU
## Câu A1 (5đ) - HTTP & Browser
### 1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render) là:
* *Nguồn tham chiếu: CCC_Frontend_2026/tuan_1_html5/01_introduction_html_universe.md (Phần Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương, phần 1.2. HTTP, phần 1.3. Browser Rendering)
  **1. DNS Lookup:**
Trước khi gửi yêu cầu, trình duyệt kiểm tra xem địa chỉ IP của shopee.vn đã được lưu trong bộ nhớ cache hay chưa. Nếu chưa có, nó sẽ gửi yêu cầu đến hệ thống DNS để phân giải tên miền thành địa chỉ IP của máy chủ.
  **2. TCP/TLS Handshake (Thiết lập bảo mật):**
Vì truy cập bằng https://, trình duyệt sẽ thiết lập kết nối bảo mật HTTPS bằng cách thực hiện quá trình TLS Handshake: xác minh chứng chỉ SSL/TLS của website, trao đổi khóa mã hóa và tạo kết nối an toàn giữa trình duyệt với máy chủ. Đây là bước thỏa thuận cách mã hóa để bảo vệ dữ liệu cá nhân của người dùng.
  **3. HTTP Request - GET (Gửi yêu cầu):**
Khi kết nối thành công, trình duyệt gửi HTTP Request (thường là phương thức GET) đến máy chủ Shopee để yêu cầu tải nội dung trang chủ.
  **4. Server Processing (Xử lý phía máy chủ)**
Máy chủ Shopee nhận yêu cầu, chuyển qua hệ thống xử lý phía Backend, kiểm tra dữ liệu cần thiết, xác định nội dung cần trả về, có thể truy vấn database hoặc gọi các dịch vụ nội bộ khác.
  **5. HTTP Response (Phản hồi)**
Sau khi xử lý xong, máy chủ gửi HTTP Response quay trở lại trình duyệt. Response này thường chứa file HTML chính cùng các liên kết đến CSS, JavaScript, hình ảnh và các tài nguyên khác
  **6.Browser Rendering (Xây dựng giao diện):**
Trình duyệt bắt đầu tạo trang web hoàn chỉnh qua các bước:
- Parse HTML: Dựng khung (Tạo cấu trúc trang).
- Parse CSS: Trang trí (Sơn màu cam Shopee, chỉnh font chữ, bố cục,...).
- Execute JS: Chức năng (Xử lý tương tác, hiệu ứng banner, giỏ hàng).
- Paint: Hiển thị hình ảnh và nội dung hoàn chỉnh lên màn hình.
### 2. 
* *Nguồn tham chiếu: CCC_Frontend_2026/tuan_1_html5/01_introduction_html_universe.md (Phần 4.3. Developer Tools (F12)-"Kính hiển vi" cho website*
* Trong DevTools của Chrome, tab Network cho thấy toàn bộ quá trình tải tài nguyên của website và các requests/responses giữa trình duyệt với máy chủ. Các thông tin chính gồm:
  * **Name**: Tên file hoặc tài nguyên được tải từ server (HTML, CSS, JS, ảnh, font...).
  * **Status:** Mã trạng thái phải hồi từ server (ví dụ: 200 OK (thành công) ).
  * **Type:** Loại tài nguyên (ví dụ: document, stylesheet, script, image, font...).
  * **Initiator:** Đối tượng hoặc dòng mã nào đã khởi tạo yêu cầu này.
  * **Size:** Dung lượng file tải về từ server
  * **Time:** Thời gian request đó tải xong
  * **Waterfall:** Cho biết file nào được tải trước, file nào tải sau và mất bao lâu để hoàn thành
* **Status Code của request đầu tiên:**
  <img width="1553" height="872" alt="Screenshot 2026-04-29 125804" src="https://github.com/user-attachments/assets/cd7a16bc-0f22-4b7a-8735-7826343371de" />
* **Tổng thời gian load trang:**
  <img width="1916" height="1075" alt="Screenshot 2026-04-29 125714" src="https://github.com/user-attachments/assets/24280413-8527-4ce1-a640-5fabcf735cb7" />
* **Một request trả về file CSS:**
  <img width="1918" height="1078" alt="Screenshot 2026-04-29 133124" src="https://github.com/user-attachments/assets/5b70ba8e-4487-4bc1-8d1e-785ce76f1df1" />

## Câu A2 (5đ) - Semantic HTML
*Dựa vào chương 04, trang web này bị Google đánh giá SEO thấp vì mắc lỗi "Div Soup", sử dụng quá nhiều thẻ <div>, không thể hiện rõ cấu trúc nội dung. Công cụ tìm kiếm khó hiểu đâu là header, menu điều hướng, nội dung chính hay sản phẩm
*Các lỗi sematic:
  * Sử dụng ```<div class="header">``` thay vì ```<header>```: Theo chương 4, ```<header>``` là thẻ semantic dùng cho phần đầu trang, còn ```<div class="header">```, trình duyệt vẫn hiển thị được nhưng Google không hiểu đây là khu vực đầu trang của website.
  * Sử dụng ```<div class="menu">```: Công cụ tìm kiếm khó nhận biết đây là tập hợp các liên kết chính của website -> nên dùng <nav>: dùng cho khu vực điều hướng như menu, breadcrumb.
  * Sử dụng ```<div class="main">```: làm Google khó xác định đâu là phần nội dung quan trọng nhất -> nên dùng <main>: dùng cho nội dung chính của trang và mỗi trang chỉ nên có 1 <main>.
  * Sử dụng ```<div class="product">```: Google không hiểu đây là một đơn vị nội dung độc lập để hiển thị trên kết quả tìm kiếm. -> nên dùng <article>: dùng cho nội dung độc lập như blog post, sản phẩm, comment.
  * Sử dụng ```<div class="title">```: Google sẽ xem "iPhone 16 Pro" chỉ là một đoạn văn bản bình thường, không phải từ khóa quan trọng của trang -> nên dùng thẻ từ ```<h1>``` đến ```<h6>``` để thể hiện tiêu đề quan trọng.
  * Sử dụng ```<div class="image"><img src="iphone.jpg"></div>```: Thiếu thuộc tính alt để mô tả nội dung ảnh, khiến Google không biết ảnh đó là sản phẩm gì. Và phải sử dụng ```<figure>``` cho phương tiện truyền thông có kèm chú thích.
  * Sử dụng ```<div class="footer">```: Google không nhận diện rõ đây là chân trang -> nên dùng <footer>: dùng cho phần cuối trang như copyright, links, contacts, giúp cấu trúc website đầy đủ và rõ ràng hơn.
* Sửa lại:
<header>
    <div class="logo">ShopTLU</div>

    <nav>
      <a href="/">Trang chủ</a>
      <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <article class="product">
      <h1>iPhone 16 Pro</h1>
      <p>25.990.000</p>

      <figure>
          <img src="iphone.jpg" alt="iPhone 16 Pro">
      </figure>
    </article>
</main>

<footer>
    © 2026 ShopTLU
</footer>

## Câu A3 (5đ) - Block vs Inline
*Nguồn tham chiếu: CCC_Frontend_2026/tuan_1_html5/04_visible_part_html.md (Phần Block vs Inline)*
* Kết quả hiển thị:
  Hộp 1
  Text A  Text B
  Hộp 2
  Text C  Text D
  Hộp 3
* Giải thích:
  * Vì thẻ <div> là phần tử block nên chiếm cả dòng -> sau "Hộp 1", trình duyệt bắt buộc xuống dòng để hiển thị các phần tiếp theo. Tương tự, "Hộp 2" và "Hộp 3" cũng tự tạo ra dòng riêng.
  * Vì thẻ <span> và <strong> là các phần tử inline nên chỉ chiếm nội dung (Text A và Text B đều là thẻ <span> nên nằm cùng 1 hàng, Text C (<span>) và Text D (<strong>) đều là các thẻ inline nên nằm cùng 1 hàng mới sau khi bị thẻ "Hộp 2" đẩy xuống.
## Câu A4 (5đ) - Table
*Nguồn tham chiếu: CCC_Frontend_2026/tuan_1_html5/05_tables_hyperlinks.md (Phần Table-Bảng dữ liệu)*
* **Phân biệt <thead>, <tbody>, và <tfoot>:**
  * <thead> (Table Header): Là phần đầu bảng, dùng để chứa hàng tiêu đề của bảng, nơi đặt các tiêu đề cột (thường chứa các thẻ <th>) giúp người dùng nhận biết loại dữ liệu trong cột đó.
  * <tbody> (Table Body): Là phần thân bảng, dùng để chứa nội dung dữ liệu chính của bảng (thường chứa các thẻ <td>). Đây là khu vực chứa nhiều dòng dữ liệu nhất.
  * <tfoot> (Table Footer): Là phần cuối bảng, dùng để tổng kết, thống kê, ghi chú.
* **KHÔNG NÊN dùng table để tạo layout trang web vì:**
  * Sai mục đích sử dụng (Semantics): Thẻ <table> chỉ được thiết kế dành riêng cho dữ liệu dạng bảng như danh sách, so sánh hoặc thống kê. Việc dùng nó để chia khung trang web làm mất đi ý nghĩa cấu trúc của mã HTML. -> Dùng sai khiến Google và trình đọc màn hình hiểu sai nội dung.
  * Khó đáp ứng trên điện thoại: Layout bằng table khó co giãn, khó xuống hàng và khó tối ưu cho màn hình nhỏ.
  * Code rối và khó bảo trì: Layout bằng table thường lồng nhiều hàng/cột, rất dài và khó sửa.
  * Đã có công nghệ tối ưu hơn: Hiện nay, lập trình viên sử dụng các công cụ mạnh và linh hoạt hơn là CSS Grid và CSS Flexbox để xử lý bố cục trang web, dễ căn chỉnh hơn.
# PHẦN B - THỰC HÀNH CODE (60 điểm)
