# PHIẾU BÀI TẬP 10: ASYNC JAVASCRIPT & API INTEGRATION
*Tài liệu tham chiếu: tuan_5_javascript_dom_async/20_ajax_async.md + 21_professional_dev_process.md*
## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
### Câu A1 (5đ) — Sync vs Async
Đọc chương 20. Dự đoán thứ tự output:
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```
* Giải thích Event Loop, Microtask Queue, Macrotask Queue.
  - Call Stack (Ngăn xếp thực thi): JavaScript là ngôn ngữ đơn luồng (single-threaded), xử lý các mã nguồn đồng bộ (Synchronous) tuần tự từ trên xuống dưới.
    - Đầu tiên, 1 - Start và 4 - End là các câu lệnh đồng bộ nên được đẩy vào Call Stack và in ra màn hình ngay lập tức.
  - Web APIs (Browser): Khi gặp các câu lệnh bất đồng bộ như setTimeout hoặc Promise, Engine JS sẽ đẩy chúng sang môi trường Web APIs của trình duyệt để xử lý đếm thời gian hoặc chờ trạng thái phản hồi.
  - Microtask Queue (Hàng đợi vi tác vụ): Chứa các callback của Promise.resolve().then(), async/await, hoặc MutationObserver. Microtask có độ ưu tiên cao nhất. Ngay sau khi Call Stack trống, toàn bộ tác vụ trong Microtask Queue phải được lôi ra thực thi hết sạch trước khi chuyển sang hàng đợi khác
    - Do đó, 3 - Promise và 6 - Promise 2 được xử lý ngay sau khi 4 - End chạy xong.
  - Macrotask Queue / Callback Queue (Hàng đợi đại tác vụ): Chứa các callback của setTimeout, setInterval, setImmediate, các sự kiện UI (click, scroll).
    - 2 - Timeout 0ms nằm trong Macrotask Queue nên phải xếp hàng đợi sau nhóm Microtask.
    - 5 - Timeout 100ms về sau 2 - Timeout 0ms do mất thời gian chờ 100ms ở Web APIs.
    - 7 - Nested timeout do được sinh ra muộn hơn trong quá trình duyệt 6 - Promise 2 nên nó được xếp xuống cuối cùng của hàng đợi Macrotask.
### Câu A2 (5đ) — Fetch API
Giải thích từng dòng code:
1. await fetch(...): Hàm fetch() khởi tạo một HTTP request đến máy chủ và trả về một Promise chứa đối tượng Response. Chúng ta bắt buộc cần từ khóa await để tạm dừng thực thi hàm async này, nhường luồng cho việc khác cho đến khi Promise đó giải quyết xong (mạng phản hồi) để lấy ra thực thể response.
2. response.ok: Đây là một biến Boolean. Nó sẽ mang giá trị false khi máy chủ phản hồi về các mã trạng thái lỗi HTTP nằm ngoài khoảng 200 - 299. Ví dụ 3 status codes tiêu biểu:
   - 404 (Not Found - Không tìm thấy tài nguyên).
   - 401 (Unauthorized - Chưa xác thực quyền truy cập).
   - 500 (Internal Server Error - Lỗi hệ thống từ server).
3. response.json(): Phương thức này đọc toàn bộ luồng dữ liệu (body stream) của response từ server và phân tích cú pháp chuyển nó thành object JavaScript. Quá trình đọc stream dữ liệu này diễn ra bất đồng bộ vì dữ liệu mạng truyền về theo từng gói nhỏ, do đó .json() trả về một Promise và ta tiếp tục cần await lần thứ hai.
4. try...catch: Khối catch ở đây sẽ bắt các lỗi:
  - Lỗi Network: Rớt mạng hoàn toàn, DNS sai, chặn tường lửa CORS (lúc này hàm fetch bị reject).
  - Lỗi logic ném ra thủ công: Lệnh throw new Error khi response.ok bằng false.
  - Lỗi Parse JSON: Nếu dữ liệu server trả về là văn bản thuần hoặc HTML chứ không phải JSON chuẩn, hàm .json() sẽ văng lỗi.
### Câu A3 (5đ) — Promise States
* sơ đồ 3 trạng thái của Promise (Pending → Fulfilled, Pending → Rejected).
```
        Pending (Đang chờ xử lý)
        /      \
       /         \
  Fulfilled     Rejected
(..then())       (.catch())
(Thành công)     (Thất bại)
```
* Callback Hell là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều lớp, khiến mã nguồn phát triển theo chiều ngang (hình kim tự tháp lồng nhau), cực kỳ khó đọc, khó bảo trì và khó bẫy lỗi.
* Ví dụ 4 cấp callback hell → Refactor thành async/await.
```JavaScript
  // ❌ CALLBACK HELL
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            logReport(user, posts[0], comments, (report) => {
                console.log("Hoàn thành báo cáo:", report);
            });
        });
    });
});
```
* Khắc phục triệt để bằng Async/Await:
```JavaScript
// ✅ REFACTOR SẠCH SẼ VỚI ASYNC/AWAIT
async function generateReport() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const report = await logReport(user, posts[0], comments);
        console.log("Hoàn thành báo cáo:", report);
    } catch (error) {
        console.error("Lỗi quy trình tạo báo cáo:", error);
    }
}
```

## PHẦN C — PHÂN TÍCH (20 điểm)
### Câu C1 (10đ) — Error Handling Strategy
1. Network Errors (Mất mạng giữa chừng):
Chiến lược: Sử dụng một biến cờ trạng thái kiểm tra thuộc tính toàn cục navigator.onLine. Khi phát hiện mất kết nối, lập tức ngắt việc gửi request, đóng các cổng tương tác và hiển thị một Banner thông báo khẩn cấp lên đầu giao diện: "Mất kết nối Internet. Hệ thống đang tự động theo dõi để kết nối lại...". Đồng thời dùng sự kiện window.addEventListener("online") để tự động kích hoạt nạp lại dữ liệu ngay khi có mạng trở lại mà không bắt user phải ép tải thủ công (Reload).
2. API errors (Các mã trạng thái từ máy chủ):
- Lỗi 500 (Internal Server Error): Lỗi từ phía code hệ thống của Backend. Ta hiển thị thông báo nhẹ nhàng với UX: "Hệ thống đang bảo trì ngắn hạn, vui lòng thử lại sau vài phút." kèm theo việc tự động gửi log báo lỗi về hệ thống giám sát (như Sentry).
- Lỗi 404 (Not Found): Không tìm thấy sản phẩm. Điều hướng giao diện render một ảnh minh họa rỗng kèm nút quay về trang chủ.
- Lỗi 429 (Too Many Requests - Bị chặn do spam tần suất lớn): Triển khai cơ chế Exponential Backoff để ép hệ thống Frontend tạm dừng gọi API này trong một khoảng thời gian tăng dần trước khi thử lại, tránh việc tiếp tục làm nghẽn máy chủ.
3. Timeout (API chậm > 10 giây) → Viết code fetchWithTimeout(url, ms)
  Nếu một API phản hồi quá chậm (ví dụ lớn hơn 10 giây), ta cần ngắt kết nối để giải phóng tài nguyên hệ thống bằng cách sử dụng công cụ AbortController.
```JavaScript
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout); // Kích nổ lệnh hủy khi quá thời gian

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error("⚠️ Kết nối mạng quá hạn (Timeout) — Máy chủ phản hồi chậm.");
        }
        throw error;
    }
}
```
4. Retry logic (thử lại 3 lần nếu lỗi network) → Viết code fetchWithRetry(url, maxRetries)
Nếu xảy ra lỗi đường truyền mạng bất định, Frontend có thể tự động thử gửi lại yêu cầu tối đa 3 lần trước khi buông tay báo lỗi cho người dùng.
```JavaScript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response; // Trả về ngay nếu thành công
        } catch (error) {
            if (i === maxRetries) throw new Error(`Đã thử lại ${maxRetries} lần nhưng vẫn mất kết nối mạng.`);
            console.warn(`Thử lại lần ${i} thất bại. Đang thử lại...`);
            // Chờ 1 giây trước khi tiến hành vòng lặp thử kế tiếp
            await new Promise(res => setTimeout(res, 1000));
        }
    }
}
```
### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race
* Giải thích sự khác nhau. Cho ví dụ thực tế khi nào dùng mỗi cái:

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | Khi TẤT CẢ các Promise truyền vào đều thành công (fulfilled). | Chỉ cần 1 thằng duy nhất thất bại (rejected) là lập tức nổ lỗi chung cho toàn bộ tổ hợp. | Gọi một bộ APIs phụ thuộc ràng buộc lẫn nhau cấu thành một trang đơn. Ví dụ: Trang Chi tiết đơn hàng (Cần nạp song song: Thông tin Đơn hàng + Thông tin Khách hàng + Danh sách sản phẩm mua). Một cái lỗi thì trang vô giá trị. |
| `.allSettled()` | Khi TẤT CẢ các Promise đều chạy xong bất kể kết quả của chúng là thành công hay thất bại. | Không bao giờ rơi vào trạng thái reject.| Phù hợp cho việc nạp các Widget độc lập trên một màn hình tổng hợp Dashboard (như Bài B4). Thằng API Thời tiết chết thì Widget mạng xã hội vẫn phải hoạt động bình thường. |
| `.race()` | Khi có 1 thằng đầu tiên chạy xong sớm nhất (bất kể thành công hay thất bại). | Chỉ reject nếu thằng chạy nhanh nhất kia bị lỗi. | Triển khai bài toán chạy đua tốc độ mạng CDN. Gửi cùng 1 yêu cầu tải tệp ảnh đến 3 Server lưu trữ phân tán khắp các nước, thằng cụm máy chủ nào trả dữ liệu về sớm nhất thì ta lấy hiển thị, hủy bỏ các tiến trình còn lại. |
| `.any()` | Khi có 1 thằng đầu tiên chạy THÀNH CÔNG sớm nhất. | Chỉ reject khi TẤT CẢ mọi Promise truyền vào đều thất bại hoàn toàn. | Tính năng đăng nhập thông minh bằng các cổng dự phòng. Frontend gửi lệnh xác thực cùng lúc đến Server 1, Server 2 và Server 3. Chỉ cần 1 server mượt mà xác thực thành công là cho user vào hệ thống, bỏ qua các server bị nghẽn mạng khác. |
* Minh họa code cho Promise.all và Promise.allSettled:
```
  // Kịch bản: Tải dữ liệu trang chi tiết đơn hàng
const fetchOrder = fetch("/api/order/1").then(r => r.json());
const fetchUser = fetch("/api/user/9").then(r => r.json());

// 1. Dùng Promise.all (Tất cả hoặc không có gì)
Promise.all([fetchOrder, fetchUser])
    .then(([order, user]) => console.log("Nạp thành công trang đơn hàng:", order, user))
    .catch(err => console.error("Một API cốt lõi bị hỏng, hủy render trang."));

// 2. Dùng Promise.allSettled (Nạp bảng tin độc lập)
const loadNews = fetch("/api/news").then(r => r.json());
const loadAds = fetch("/api/bad-ads-url").then(r => r.json()); // Giả sử lỗi 404

Promise.allSettled([loadNews, loadAds])
    .then(results => {
        if(results[0].status === "fulfilled") renderNewsView(results[0].value);
        if(results[1].status === "fulfilled") renderAdsView(results[1].value);
        else console.log("Widget quảng cáo lỗi thì thôi, vẫn xem được tin tức!");
    });
```
