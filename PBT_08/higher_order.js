// 1. pipe() — Nối liên tiếp một chuỗi các functions xử lý từ trái qua phải
const pipe = (...fns) => (initialValue) => fns.reduce((value, fn) => fn(value), initialValue);

// Test Pipe
const processData = pipe(
    x => x * 2,        // 5 -> 10
    x => x + 10,       // 10 -> 20
    x => x.toString(), // 20 -> "20"
    x => "Kết quả: " + x
);
console.log(processData(5)); // Đầu ra: "Kết quả: 20"


// 2. memoize() — Cache lưu trữ kết quả để tránh tính toán lại lãng phí cấu hình
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Test Memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang thực hiện tính toán sâu...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // Hiện chữ "Đang thực hiện..."
console.log(expensiveCalc(1000000)); // Lấy ngay lập tức từ bộ nhớ cache, không tính lại!


// 3. debounce() — Trì hoãn thực thi, chỉ chạy khi hành động của người dùng đã dừng hẳn sau khoảng delay
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test Debounce
const search = debounce((query) => {
    console.log("Tìm kiếm API với từ khóa:", query);
}, 500);


// 4. retry() — Tự động gọi lại hàm bất đồng bộ (API) nếu xảy ra lỗi cho đến khi chạm mốc giới hạn
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.warn(`Lần thử thứ ${attempt} thất bại. Đang thử lại...`);
        }
    }
    throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi. Chi tiết: ${lastError.message}`);
}