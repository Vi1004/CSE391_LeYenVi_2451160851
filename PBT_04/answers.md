# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

## Câu A1 (10đ) — 5 Loại Positioning

Đọc chương 12. Điền bảng sau mà **KHÔNG** tra Google:

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Không dùng top/left | Có | Layout mặc định |
| `relative` | Có | Vị trí gốc của chính nó | Có | Dịch chuyển nhẹ element, làm mốc cho absolute |
| `absolute` | Không | Cha relative gần nhất | Có | Badge, dropdown, tooltip |
| `fixed` | Không | Viewport (màn hình trình duyệt | Không | Chat button, modal overlay |
| `sticky` | Có -> không | Viewport (khi dính) | Có khi đã "dính" | Sticky header, sidebar |

**Câu hỏi thêm**
* **Khi nào absolute tham chiếu body?** Khi tất cả các thẻ cha bọc ngoài nó đều là position: static (mặc định), hoặc nó không nằm trong bất kỳ thẻ cha nào khác ngoài body. Lúc này, nó không tìm được điểm tựa nào nên sẽ lấy toàn bộ trang web làm gốc tọa độ.
* **Khi nào tham chiếu parent?** Khi thẻ cha (hoặc các thẻ bọc ngoài nó) có thuộc tính position được thiết lập là một trong các giá trị: relative, absolute, fixed, hoặc sticky (tức là khác static).
* **khái niệm "nearest positioned ancestor":** Là thẻ cha/ông nội/tổ tiên gần nó nhất có thuộc tính position khác static. Phần tử absolute sẽ lấy khung của thẻ này làm gốc để thụt lề (top, left, right, bottom). Nếu cả cha và ông đều có position: relative, phần tử con absolute sẽ bám theo cha (vì cha gần nó hơn).

## Câu A2 (10đ) — Flexbox vs Grid
**Trường hợp 1**
```css
.container { display: flex; }
.item { flex: 1; }
```
- `display: flex` → items nằm ngang
- `flex: 1` → chia đều chiều rộng

Bố cục: 
```text
| Item 1 | Item 2 | Item 3 | Item 4 |
```

**Trường hợp 2**
```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```
- `flex-wrap: wrap` → xuống dòng khi không đủ chỗ
- `45% + 2.5% + 2.5% = 50%` → mỗi item chiếm khoảng nửa hàng

Bố cục:
```text
+-----------------------------------------------------------+
|  (2.5%) [  Item 1 (45%)  ] (5%) [  Item 2 (45%)  ] (2.5%) |
|  (2.5%) [  Item 3 (45%)  ] (5%) [  Item 4 (45%)  ] (2.5%) |
|  (2.5%) [  Item 5 (45%)  ] (5%) [  Item 6 (45%)  ] (2.5%) |
+-----------------------------------------------------------+
```

**Trường hợp 3**
```css
.container { display: flex; justify-content: space-between; align-items: center; }
```

- `justify-content: space-between` → item đầu sát trái, item cuối sát phải, item giữa ở giữa
- `align-items: center` → căn giữa theo chiều dọc

→ 3 item nằm ngang, cách đều nhau.

Bố cục:
```text
|Item 1                    Item 2                    Item 3|
```
**Trường hợp 4**
```css
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
```
- Grid có 3 cột:
  - Cột 1 = 200px
  - Cột 2 = chiếm phần còn lại (1fr)
  - Cột 3 = 200px
  - Có khoảng cách 20px giữa các cột

Bố cục:
```text
+-----------------------------------------------------------+
| [ Item 1 (200px) ] <20px> [    Item 2 (1fr)    ] <20px> [ Item 3 (200px) ] |
+-----------------------------------------------------------+
```

**Trường hợp 5**
```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
```

- repeat(3, 1fr) → 3 cột bằng nhau
- 7 items sẽ tự xuống hàng
- 3 hàng, item cuối ở hàng cuối, cột đầu tiên

Bố cục:
```text
+-----------------------------------------------------------+
| [   Item 1 (1fr)   ]  [   Item 2 (1fr)   ]  [   Item 3 (1fr)   ] |
|                      < gap: 10px >                        |
| [   Item 4 (1fr)   ]  [   Item 5 (1fr)   ]  [   Item 6 (1fr)   ] |
|                      < gap: 10px >                        |
| [   Item 7 (1fr)   ]  (Trống)              (Trống)            |
+-----------------------------------------------------------+
```

# PHẦN C — SUY LUẬN (20 điểm)

## Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

1. Navigation bar ngang (logo + menu + buttons)
- Lựa chọn: Flexbox
- Giải thích: Navbar là layout 1 chiều (ngang). Flexbox rất hợp để căn hàng ngang, chia khoảng cách, căn giữa theo chiều dọc.
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Lựa chọn: Grid
- Giải thích: Đây là layout dạng lưới 2 chiều (hàng + cột). Grid giúp tạo 3 cột đều nhau rất dễ bằng repeat(3, 1fr). Khi số lượng ảnh tăng lên và không biết trước, Grid sẽ tự động tạo thêm hàng mới và xếp các ảnh thẳng hàng tăm tắp mà không cần tính toán thủ công hay lo bị lệch hàng như Flexbox.
3. Layout blog: main content + sidebar
- Lựa chọn: Grid
- Giải thích: Có cấu trúc rõ ràng nhiều cột (content + sidebar). Grid kiểm soát kích thước cột tốt hơn Flexbox. Grid giúp kiểm soát tỷ lệ cố định của sidebar và sự co giãn của main content một cách độc lập, giữ cho layout toàn trang luôn ổn định
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Lựa chọn: Grid hoặc Flexbox
- Giải thích:
  - Dùng Flexbox: Khi muốn các cột tự co giãn theo độ dài của chữ bên trong (flex: 1), giúp dễ dàng căn chỉnh khoảng cách giữa các dòng chữ (flex-direction: column).
  - Dùng Grid: Để chia cứng thành 4 cột bằng nhau (repeat(4, 1fr)). Khi thu nhỏ màn hình xuống (responsive), Grid giúp chuyển thành layout 2 cột hoặc 1 cột rất gọn gàng thông qua Media Query chỉ bằng một dòng code
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Lựa chọn: Flexbox
- Giải thích: Card sản phẩm là layout 1 chiều theo trục dọc (flex-direction: column). Điểm mấu chốt để "nút luôn dính đáy" cho dù đoạn text ở giữa dài hay ngắn là tận dụng cơ chế co giãn của Flexbox: Ta cần cài đặt thuộc tính margin-top: auto cho phần tử Nút (hoặc cài flex: 1 cho phần Text ở giữa để đẩy nút xuống đáy)

## Câu C2 (10đ) — Debug Flexbox
* **Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**
```
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```
- Nguyên nhân:
  - Các card có lượng text khác nhau → chiều cao mỗi card khác nhau.
  - Nút .btn nằm ngay sau nội dung nên:
    - card dài → nút xuống thấp
    - card ngắn → nút nằm cao hơn

→ các nút bị lệch hàng. 
- Code sửa:
```
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    width: 30%;

    border: 1px solid #ccc;
    padding: 15px;

    display: flex;
    flex-direction: column;
}

.card .btn {
    padding: 10px;

    margin-top: auto;
}
```
* **Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên**
```
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```
- Nguyên nhân: đã khai báo display: flex cho .hero để kích hoạt Flexbox, nhưng chưa hề ra lệnh cho nó phải căn giữa các phần tử con như thế nào. Thuộc tính text-align: center chỉ có tác dụng căn giữa các dòng chữ hoặc phần tử inline bên trong .hero-content, chứ không thể tự căn chỉnh cả khối .hero-content lớn theo hai chiều ngang dọc của cha.
- Code sửa:
```
.hero {
    height: 100vh;
    display: flex;
    /* SỬA TẠI ĐÂY */
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center;     /* Căn giữa theo chiều dọc */
}
.hero-content {
    text-align: center; /* Giữ lại để chữ bên trong khối cũng được căn giữa */
}
```
* **Lỗi 3: Sidebar bị co lại khi content quá dài**
```
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```
- Nguyên nhân: Trong cơ chế của Flexbox, tất cả các phần tử con (flex items) mặc định đều có thuộc tính flex-shrink: 1. Điểm này có nghĩa là khi không gian tổng thể bị thiếu (do phần .content chứa quá nhiều văn bản dài), các item khác sẽ tự động "co rúm" lại để nhường chỗ. Do đó, cái width: 250px của .sidebar đã bị ép.
- Code sửa:
```
.layout { display: flex; }
.sidebar { 
    /* Tốc ký của: flex-grow: 0, flex-shrink: 0, flex-basis: 250px */
    flex: 0 0 250px; 
}
.content { flex: 1; }
```

  
- Code sửa:
