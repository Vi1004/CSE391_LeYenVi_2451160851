*Tài liệu tham chiếu: tuan_4_javascript_basics/01_basics_introduction.md → 04_control_structures.md*
# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — var / let / const
Đọc chương 03. Không chạy code, dự đoán output cho từng đoạn:
```
// Đoạn 1
console.log(x);
var x = 5;
```
-> Dự đoán: undefined
-> Giải thích:
- var được hoisting lên đầu phạm vi.
- Biến được khai báo trước khi gán giá trị nên nhận undefined

```
// Đoạn 2
console.log(y);
let y = 10;
```
-> Dự đoán: ReferenceError: Cannot access 'y' before initialization
-> Giải thích:
- let cũng được hoisting nhưng nằm trong TDZ (Temporal Dead Zone).
- Không thể truy cập trước khi khai báo.

```
// Đoạn 3
const z = 15;
z = 20;
console.log(z);
```
-> Dự đoán: TypeError: Assignment to constant variable.
-> Giải thích: Biến const khai báo một hằng số tham chiếu. Trình duyệt ngăn chặn mọi hành vi gán lại giá trị mới cho biến này bằng lỗi TypeError

// Đoạn 4
```
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
-> Dự đoán: [1, 2, 3, 4]
-> Giải thích: 
- const không cho phép gán lại biến.
- Tuy nhiên nội dung của mảng vẫn có thể thay đổi.

```
// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```
-> Dự đoán: 
- Trong block: 2 
- Ngoài block: 1
-> Giải thích:
- let có phạm vi block.
- Hai biến a là hai biến khác nhau.

## Câu A2 (5đ) — Data Types & Coercion
Không chạy code, dự đoán kết quả:
```
console.log(typeof null);              // "object"
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // "" (Chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" (hoặc 0 tùy thuộc vào ngữ cảnh Engine)
```
**Giải thích:** "5" + 3 và "5" - 3 cho kết quả khác nhau vì:
- Toán tử + có thể nối chuỗi.
- Khi có chuỗi tham gia phép cộng, JavaScript chuyển sang nối chuỗi.

## Câu A3 (5đ) — So sánh == vs ===
Dự đoán true hay false:
```
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```
**Quy tắc:** Từ giờ trở đi, nên sử dụng === vì:
- Không ép kiểu dữ liệu.
- Kết quả chính xác hơn.
- Tránh các lỗi khó phát hiện.

## Câu A4 (5đ) — Truthy & Falsy
Liệt kê TẤT CẢ giá trị Falsy trong JavaScript (đọc tài liệu). Sau đó dự đoán kết quả:
1. Danh sách 8 giá trị Falsy trong JavaScript:
   - false
   - 0
   - =0
   - 0n (BigInt zero)
   - "" hoặc '' hoặc chuỗi rỗng
   - null
   - undefined
   - NaN
2. Dự đoán kết quả:
```
if ("0") console.log("A");           // In "A" 
if ("") console.log("B");            // Không in
if ([]) console.log("C");            // In "C"
if ({}) console.log("D");            // In "D"
if (null) console.log("E");          // Không in
if (0) console.log("F");             // Không in
if (-1) console.log("G");            // In "G"
if (" ") console.log("H");           // In "H"
```
## Câu A5 (5đ) — Template Literals
Viết lại 3 cách nối chuỗi sau bằng template literal (backtick):
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug JavaScript
Tìm và sửa TẤT CẢ lỗi trong code sau (có ít nhất 6 lỗi):
- Lỗi 1: if (giaSauGiam = 0)
  -> Giải thích: Vì "=" là phép gán
  -> Sửa: if (giaSauGiam === 0)
- Lỗi 2: const gia = tinhGiaGiamGia("100000", 20)
  -> Giải thích: `giaBan` là chuỗi
  -> Sửa: const gia = tinhGiaGiamGia(100000, 20)
- Lỗi 3: Thiếu dấu ; ở cuối các câu lệnh return và khởi tạo biến
  -> Sửa: Thêm dấu ; ở cuối các câu lệnh return và khởi tạo biến
- Lỗi 4: Không kiểm tra kiểu dữ liệu đầu vào.
  -> Sửa: Nên thêm: if (isNaN(giaBan) || isNaN(phanTramGiam)) { return "Dữ liệu không hợp lệ"; }
- Lỗi 5: (Lỗi Logic Scope của var trong vòng lặp Async): Vòng lặp for (var i = 0; i < 5; i++) kết hợp hàm bất đồng bộ setTimeout.
  -> Giải thích: Vì var không có block scope mà mang function/global scope, cả 5 hàm callback của setTimeout sau 1 giây thực thi đều nhìn về chung một tham chiếu biến i khi này đã tăng kịch khung lên giá trị 5. Kết quả in ra 5 lần chuỗi "Item 5" thay vì từ 0 đến 4.
- Lỗi 6 (lỗi ẩn): setTimeout(function() { console.log("Item " + i) }, 1000)
  - Sau 1 giây vòng lặp đã chạy xong nên:
Item 5
Item 5
Item 5
Item 5
Item 5

được in ra.
  - Cách sửa: for (let i = 0; i < 5; i++) { setTimeout(function () { console.log("Item " + i); }, 1000); }
  - Giải thích:
      - var có function scope.
      - let có block scope.
      - Mỗi vòng lặp tạo một biến i riêng nên giữ được giá trị đúng.   
