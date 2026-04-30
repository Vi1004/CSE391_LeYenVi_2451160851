# PBT_01
# PHẦN A - KIỂM TRA ĐỌC HIỂU
## Câu A1 (5đ) - HTTP & Browser
### 1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render) là:
* *Nguồn tham chiếu: CCC_Frontend_2026/tuan_1_html5/01_introduction_html_universe.md (Phần Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương, phần 1.2. HTTP, phần 1.3. Browser Rendering)
  * **1. DNS Lookup:**
Trước khi gửi yêu cầu, trình duyệt kiểm tra xem địa chỉ IP của shopee.vn đã được lưu trong bộ nhớ cache hay chưa. Nếu chưa có, nó sẽ gửi yêu cầu đến hệ thống DNS để phân giải tên miền thành địa chỉ IP của máy chủ.
  * **2. TCP/TLS Handshake (Thiết lập bảo mật):**
Vì truy cập bằng https://, trình duyệt sẽ thiết lập kết nối bảo mật HTTPS bằng cách thực hiện quá trình TLS Handshake: xác minh chứng chỉ SSL/TLS của website, trao đổi khóa mã hóa và tạo kết nối an toàn giữa trình duyệt với máy chủ. Đây là bước thỏa thuận cách mã hóa để bảo vệ dữ liệu cá nhân của người dùng.
  * **3. HTTP Request - GET (Gửi yêu cầu):**
Khi kết nối thành công, trình duyệt gửi HTTP Request (thường là phương thức GET) đến máy chủ Shopee để yêu cầu tải nội dung trang chủ.
  * **4. Server Processing (Xử lý phía máy chủ)**
Máy chủ Shopee nhận yêu cầu, chuyển qua hệ thống xử lý phía Backend, kiểm tra dữ liệu cần thiết, xác định nội dung cần trả về, có thể truy vấn database hoặc gọi các dịch vụ nội bộ khác.
  * **5. HTTP Response (Phản hồi)**
Sau khi xử lý xong, máy chủ gửi HTTP Response quay trở lại trình duyệt. Response này thường chứa file HTML chính cùng các liên kết đến CSS, JavaScript, hình ảnh và các tài nguyên khác
  * **6.Browser Rendering (Xây dựng giao diện):**
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
```
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
```
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
## Bài B3(15đ) - Debug HTML
* Lỗi 1: Dòng 1 - Thẻ ```<!DOCTYPE>``` thiếu khai báo html - Sửa thành ```<!DOCTYPE html>```
* Lỗi 2: Dòng 2 - Thiếu thuộc tính lang trong thẻ ```<html>``` - Sửa thành ```<html lang="vi">```
* Lỗi 3: Dòng 4 - Thẻ ```<title>``` chưa có thẻ đóng ```</title>``` - Thêm ```</title>```
* Lỗi 4: Dòng 5 - ```<meta charset="utf8">``` sai - Sửa thành ```<meta charset="UTF-8">```
* Lỗi 5: Dòng 8 - Thẻ đóng ```<h1>``` viết sai, thiếu "/" - Sửa thành ```<h1>Welcome to ShopTLU</h1>```
* Lỗi 6: Dòng 12 - ```<a href="home">``` sai link (thiếu "/" hoặc ".html") - Sửa thành ```<a href="home.html">```
* Lỗi 7: Dòng 12 - Thẻ đóng ```<a>``` viết sai, thiếu "/" - Sửa thành ```<a href="home">Trang chủ</a>```
* Lỗi 8: Dòng 20 - Thẻ ```<img>``` thiếu dấu ngoặc kép cho đường dẫn và thiếu thuộc tính alt - Sửa thành ```<img src="iphone.jpg" alt="iPhone 16 Pro">```
* Lỗi 9: Dòng 22 - Lỗi chồng chéo thẻ: ```<b>``` mở trước nhưng đóng sau ```</p>``` - Sửa thành <p>Giá: ```<b>25.990.000đ</b></p>```
* Lỗi 10: Dòng 27 - Bảng thiếu cấu trúc ```<thead>``` và ```<tbody>``` để phân loại dữ liệu - Bổ sung ```<thead>``` cho hàng tiêu đề và ```<tbody>``` cho dữ liệu
* Lỗi 11: Dòng 29, 30 - Các ô tiêu đề trong bảng dùng thẻ ```<td>``` là sai - Sửa thành ```<th>```
* Lỗi 12: Dòng 40 - Sử dụng thẻ ```<main>``` lần 2 là sai, mỗi trang chỉ có duy nhất 1 thẻ ```<main>``` - Đổi thẻ ```<main>``` thứ 2 thành ```<aside>```
* Lỗi 13: Dòng 45 - Thẻ ```<p>``` chưa có thẻ đóng ```</p>``` - Thêm ```</p>```
## Bài B4(15đ) - Phân tích trang web thật (Tiki.vn)
Sử dụng DevTools (F12):
 1. *Nguồn tham chiếu: CCC_Frontend_2026/tuan_1_html5/04_visible_part_html.md*
  * 3 thẻ semantic HTML5 mà trang Tiki.vn sử dụng:
    * <header>: Phần trên cùng của trang (bao gồm logo, thanh tìm kiếm, menu chính,...)
    <img width="1919" height="979" alt="Screenshot 2026-04-30 211603" src="https://github.com/user-attachments/assets/b0589deb-960b-482c-a520-d86b6c48d00d" />

    * <main>: Toàn bộ phần nội dung chính ở giữa trang
    <img width="1917" height="976" alt="Screenshot 2026-04-30 212447" src="https://github.com/user-attachments/assets/67442221-e3f3-4bc3-87ab-f6e1d3e256f8" />

    * <footer>: Phần cuối trang web
    <img width="1919" height="961" alt="Screenshot 2026-04-30 212923" src="https://github.com/user-attachments/assets/08e68c4f-5828-4280-ad16-95e3ce1550ce" />
  * 2 thẻ mà trang KHÔNG dùng đúng semantic:
    * Lỗi 1: Trang sử dụng nhiều ```<div>``` thay vì ```<article>``` cho mỗi sản phẩm -> Làm Google khó hiểu từng sản phẩm là 1 nội dung độc lập
    <img width="1914" height="965" alt="Screenshot 2026-04-30 213854" src="https://github.com/user-attachments/assets/ea895dde-47ee-480c-8cd8-cb080789fbfb" />
    * Lỗi 2: Sidebar "Danh mục" sử dụng nhiều thẻ ```<div>``` thay vì ```<aside>```
    <img width="1916" height="870" alt="Screenshot 2026-04-30 214230" src="https://github.com/user-attachments/assets/f837a4b7-69f5-4d56-870c-4760492852dd" />

 2. Không có thẻ ```<table>``` trên trang tiki.vn
 3. Trang web tiki.vn không có thẻ ```<form>``` vì trang web dùng <div>
    <img width="1919" height="974" alt="image" src="https://github.com/user-attachments/assets/313cba70-1845-4dd2-b606-22d46e4e9ed4" />

# PHẦN C - SUY LUẬN (20 điểm)
## Câu C1 (10đ) - Thiết kế cấu trúc
```
<!DOCTYPE html> <!-- Khai báo HTML5 -->
<html lang="vi"> <!-- Ngôn ngữ trang là tiếng Việt -->
<head>
 <meta charset="UTF-8"> <!-- Hỗ trợ tiếng Việt -->
 <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive -->
 <title>Chi tiết sản phẩm</title>
</head>

<body>
 <header> <!-- header chứa phần đầu trang -->
  <h1>ShopTLU</h1>  <!-- Tiêu đề website -->
  <nav>  <!-- nav vì đây là điều hướng -->
   <ul>  <!-- ul vì menu không có thứ tự -->
    <li><a href="/">Trang chủ</a></li>
    <li><a href="/category">Danh mục</a></li>
   </ul>
  </nav>
 </header>
 <main>  <!-- main chứa nội dung chính của trang -->
  <nav aria-label="breadcrumb">  <!-- nav vì đây là điều hướng -->
   <ol>  <!-- ol vì có thứ tự cấp bậc -->
    <li><a href="/">Trang chủ</a></li>
    <li><a href="/mobile">Điện thoại</a></li>
    <li><a href="/mobile/iphone">iPhone 16</a></li>
   </ol>
  </nav>
  <section>  <!-- gom nhóm nội dung sản phẩm -->
   <!-- Khu vực ảnh sản phẩm -->
   <article>  <!-- sản phẩm là nội dung độc lập -->
    <figure>  <!-- nhóm ảnh sản phẩm -->
     <img src="#" alt="Ảnh sản phẩm 1">
     <img src="#" alt="Ảnh sản phẩm 2">
     <img src="#" alt="Ảnh sản phẩm 3">
     <img src="#" alt="Ảnh sản phẩm 4">
     <img src="#" alt="Ảnh sản phẩm 5">
     <figcaption>Hình ảnh sản phẩm</figcaption>  <!-- mô tả ảnh -->
    </figure>
   </article>
   <article>
    <h2>iPhone 16 Pro Max</h2>
    <p>Giá: <strong>34.990.000</strong></p>  <!-- strong nhấn mạnh giá tiền -->
    <p>Đánh giá sao: ⭐⭐⭐⭐⭐</p>
    <p>Mô tả sản phẩm: Chip A18 mạnh mẽ, camera cải tiến vượt bậc</p>
   </article>
  </section>
  
  <!-- Bảng thông số kỹ thuật -->
  <section>
   <h2>Thông số kỹ thuật</h2>
   <table border="1">
    <thead>
     <tr>
      <th>Thuộc tính</th>
      <th>Thông số</th>
      </th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>Màn hình</td>
      <td>6.9 inch, OLED</td>
     </tr>
     <tr>
      <td>Chipset</td>
      <td>Apple A18 Pro</td>
     </tr>
    </tbody>
   </table>
  </section>

  <section>  <!-- Khu vực chứa các đánh giá/bình luận của người dùng --.
   <h2>Đánh giá & Bình luận</h2>
   <article>
    <h3>Ngươi dùng A</h3>
    <p>Sản phẩm tốt, giao hàng nhanh</p>
   </article>
   
   <article>
    <h3>Ngươi dùng B</h3>
    <p>Sản phẩm tốt</p>
   </article>
  </section>
 </main>

 <aside> <!-- Sidebar chứa các thông tin phụ (Sản phẩm tương tự)
  <h2>Sản phẩm tương tự</h2>
  <ul>
   <li><a href="/samsung-s24">Samsung Galaxy S24 Ultra</a></li>
   <li><a href="/iphone">iPhone 17</a></li>
  </ul>
 </aside>

 <footer>  <!-- Chứa thông tin cuối trang (bản quyền) -->
  <p>&copy; 2026 ShopTLU</p>
 </footer>
</body>
</html>
```
## Câu C2 (10đ) - So sánh & Tranh luận
Quan điểm "Dùng ```<div>``` và class" có vẻ nhanh và tiện lúc đầu. Tuy nhiên, việc học và sử dụng Semantic HTML không hề tốn thời gian vô ích, mà thực chất là cách để chúng ta xây dựng một "nền móng" bền vững cho website
  - Thứ nhất, về tối ưu hóa công cụ tìm kiếm (SEO): Các công cụ như Google không hiểu được ý nghĩa của một class như .tieude-sanpham. Tuy nhiên, nếu bạn dùng thẻ ```<h1>``` hay ```<article>```, các bot tìm kiếm sẽ ngay lập tức nhận diện được đâu là nội dung quan trọng nhất. Điều này giúp trang web có thứ hạng cao hơn trên kết quả tìm kiếm, một giá trị mà class không thể mang lại.
  - Thứ hai, về khả năng truy cập (Accessibility): Đối với người khiếm thị sử dụng trình đọc màn hình (Screen Readers), thẻ ```<div>``` hoàn toàn vô nghĩa. Khi dùng thẻ ```<nav>```, ```<main>``` hay ```<button>```, trình đọc màn hình sẽ thông báo chính xác cho người dùng biết họ đang ở đâu và có thể tương tác gì. Nếu chỉ dùng ```<div>```, người dùng khuyết tật sẽ bị lạc lối trong một "mê cung" các khối dữ liệu không định danh.
  - **Ví dụ cụ thể:** một trang sản phẩm dùng ```<article>``` cho từng sản phẩm và ```<section>``` cho từng nhóm nội dung sẽ giúp cả Google lẫn screen reader hiểu rõ đâu là “một đơn vị nội dung độc lập”. Điều này đặc biệt quan trọng với e-commerce (Shopee, Tiki)
  - Tuy nhiên, ```<div>``` vẫn có chỗ đứng riêng: Thẻ ```<div>``` vẫn cực kỳ phù hợp khi chúng ta cần một vỏ bọc thuần túy cho mục đích CSS hoặc Layout (dàn trang) mà không mang ý nghĩa về mặt nội dung. Ví dụ, khi bạn cần một khối bao quanh để căn giữa trang web bằng Flexbox hoặc tạo hiệu ứng đổ bóng cho một vùng phức tạp, ```<div>``` chính là sự lựa chọn tốt nhất vì nó trung tính và không gây nhiễu cho cấu trúc ngữ nghĩa của tài liệu.
- **Kết luận:** semantic HTML không phải “tốn thời gian”, mà là đầu tư đúng ngay từ đầu để code dễ hiểu, dễ bảo trì và thân thiện với cả máy lẫn người.
