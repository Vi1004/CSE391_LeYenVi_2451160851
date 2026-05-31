# PHIẾU BÀI TẬP 09: DOM MANIPULATION & EVENTS
*Tài liệu tham chiếu: tuan_5_javascript_dom_async/19_dom_manipulation.md*
## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
### Câu A1 (5đ) — DOM Tree
1. Vẽ DOM tree (sơ đồ cây) cho HTML
div#app
├── header
│   ├── h1
│   └── nav
│       ├── a.active
│       ├── a
│       └── a
└── main
    ├── form#todoForm
    │    ├── input#todoInput
    │    └── button
    └── ul#todoList
         ├── li.todo-item
         └── li.todo-item.completed
2. Viết **querySelector** cho mỗi yêu cầu:
   - Chọn thẻ `<h1>`: document.querySelector("h1");
   - Chọn input trong form: document.querySelector("#todoForm input");
   - Chọn tất cả `.todo-item`: document.querySelectorAll(".todo-item");
   - Chọn link đang active: document.querySelector("a.active");
   - Chọn `<li>` đầu tiên trong `#todoList`: document.querySelector("#todoList li:first-child");
   - Chọn tất cả `<a>` bên trong `<nav>`: document.querySelectorAll("nav a");
     
### Câu A2 (5đ) — innerHTML vs textContent
**Sự khác nhau**
| innerHTML | textContent |
|------------|------------|
| Đọc/ghi nội dung HTML bên trong phần tử | Đọc/ghi nội dung văn bản thuần |
| Chậm hơn do phải parse HTML | Nhanh hơn |
| HTML sẽ được trình duyệt phân tích và render | HTML được coi là text bình thường |
| Có nguy cơ XSS nếu dữ liệu từ người dùng | An toàn hơn với dữ liệu người dùng |
| Có thể tạo thẻ HTML động | Không tạo được thẻ HTML |
**Ví dụ:**
title.innerHTML = "<b>Hello</b>";
Kết quả: chữ Hello in đậm.
title.textContent = "<b>Hello</b>";
Kết quả: hiển thị nguyên chuỗi <b>Hello</b>.
XSS:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
Nếu user nhập:
<img src=x onerror="alert('Hacked!')">
Script sẽ chạy.
Cách sửa:
document.querySelector("#result").textContent = userInput;

**Câu hỏi bảo mật:** 
Khi sử dụng innerHTML, nếu dữ liệu đầu vào đến từ người dùng (như ô tìm kiếm, bình luận) mà không được làm sạch (sanitize), kẻ tấn công có thể chèn các mã script độc hại. Ví dụ, thẻ <img src=x onerror="alert('Hacked!')"> sẽ kích hoạt thuộc tính onerror và chạy đoạn code JavaScript tùy ý ngay khi thẻ img tải lỗi, dẫn đến nguy cơ bị đánh cắp Cookie, Session Token hoặc chiếm quyền điều khiển tài khoản.
**Cách sửa:**
```
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
//Sửa
const userInput = document.querySelector("#search").value;
// Nguy hiểm (XSS): document.querySelector("#result").innerHTML = userInput;
// Giải pháp bảo mật an toàn 100%:
document.querySelector("#result").textContent = userInput;
```
### Câu A3 (5đ) — Event Bubbling
- Không chạy code, dự đoán thứ tự console.log:
  Click button:
```
    BUTTON
    INNER
    OUTER
```
- Giải thích: Giải thích: Do cơ chế Event Bubbling, sự kiện click kích hoạt tại phần tử sâu nhất (#btn), sau đó sủi bọt (lan truyền ngược lên trên) qua các phần tử cha chứa nó theo thứ tự: #inner rồi tới #outer.

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
### Câu C1 (8đ) — Debug DOM Code
* Tìm và sửa tất cả lỗi (ít nhất 7 lỗi):
1. addEventListener("onclick", ...) $\rightarrow$ Sai cú pháp tên event. Sửa thành "click".
2. countDisplay = count; $\rightarrow$ Đè giá trị số lên một biến tham chiếu DOM Element hằng số (const). Sửa thành countDisplay.textContent = count;.
3. historyList.innerHTML = null; $\rightarrow$ Sai kiểu dữ liệu dọn sạch DOM. Sửa thành chuỗi rỗng "".
4. item.remove; $\rightarrow$ Chỉ gọi tên hàm chứ không thực thi. Sửa thành item.remove();
5. count = localStorage.getItem("count"); $\rightarrow$ Giá trị lấy từ kho lưu trữ luôn là chuỗi (String). Khi bấm nút cộng tiếp theo sẽ bị lỗi nối chuỗi (ví dụ: "0" + 1 = "01"). Sửa thành Number(localStorage.getItem("count")) || 0.
6. Khi load trang, dữ liệu history trong localStorage chưa được render ngược lại vào historyList.
7. Hàm deleteHistory(element) gọi sự kiện xóa thủ công rườm rà. Nên dùng trực tiếp element.remove().
8. Lỗi gán trực tiếp sự kiện xóa cho các node mới tạo mà không dùng cơ chế uỷ quyền (Event Delegation) làm phình bộ nhớ.
* Sửa code:
```
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Sử dụng Event Delegation cho danh sách history
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#incrementBtn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", () => {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    historyList.innerHTML = "";
});

// Đồng bộ lưu trữ
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("historyHtml", historyList.innerHTML);
});

// Khôi phục dữ liệu
window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("historyHtml") || "";
});
```
### Câu C2 (7đ) — Performance
1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?
- Chiếm dụng bộ nhớ đồ sộ: Mỗi hàm lắng nghe sự kiện (EventListener) là một Object chiếm vùng nhớ trong RAM. Gắn 1000 hàm đồng nghĩa với việc ép trình duyệt cấp phát và quản lý 1000 vùng nhớ riêng biệt, gây chậm hệ thống, đặc biệt trên thiết bị di động.
- Khó quản lý khi thay đổi động: Nếu ta xóa bớt phần tử hoặc thêm mới bằng JavaScript, ta lại phải mất công xóa hoặc liên kết thủ công lại event cho phần tử mới, dễ sinh ra rò rỉ bộ nhớ (Memory leaks) nếu quên hủy lắng nghe.
- Giải pháp Event Delegation: Cơ chế này lợi dụng tính chất Event Bubbling. Thay vì gắn 1000 event cho 1000 thẻ con, ta chỉ gắn duy nhất 1 event lên thẻ cha bao bọc. Khi một phần tử con được click, sự kiện sẽ tự động nổi bọt lên thẻ cha. Thẻ cha sử dụng thuộc tính e.target để nhận biết chính xác thẻ con nào vừa kích hoạt hành động để xử lý, tiết kiệm RAM tối đa.
2. Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.
const fragment = document.createDocumentFragment();
for(let i = 0; i < 1000; i++){
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
DOM chỉ render 1 lần nên nhanh hơn rất nhiều.
