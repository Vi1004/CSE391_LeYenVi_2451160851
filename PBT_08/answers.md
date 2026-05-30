# PHIẾU BÀI TẬP 08: JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS
*Tài liệu tham chiếu: tuan_4_javascript_basics/05_functions.md + 06_arrays_objects.md*
# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow
### 1. Function Declaration
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
}
```

### 2. Function Expression
```javascript
const tinhThueBaoHiem = function (luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

### 3. Arrow Function
```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```
### Sự khác biệt về cơ chế Hoisting giữa 3 cách này:
- Function Declaration: Được JavaScript Engine ưu tiên đưa cả định nghĩa hàm lên đầu phạm vi (Hoisted hoàn toàn). Bạn có thể gọi hàm trước khi khai báo nó.
- Function Expression và Arrow Function: Biến lưu trữ hàm (const hoặc let) được hoisted nhưng nằm trong Temporal Dead Zone (TDZ) và không được khởi tạo. Bạn tuyệt đối không thể gọi hàm trước dòng khai báo (gây lỗi ReferenceError).
  Ví dụ:
```
// MINH HỌA HOISTING
console.log(tinhThueBaoHiemDeclaration(15000000)); 
//Chạy bình thường (In ra: { thuong: 0, thuc_nhan: 13500000 })

console.log(tinhThueBaoHiemArrow(15000000));       
//LỖI NGAY: ReferenceError: Cannot access 'tinhThueBaoHiemArrow' before initialization

function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
}
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
```

## Câu A2 (5đ) — Scope & Closure
Không chạy code, dự đoán output:
```
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // ???
console.log(c.increment());  // ???
console.log(c.increment());  // ???
console.log(c.decrement());  // ???
console.log(c.getCount());   // ???

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: ???
```
### Dự đoán output:
- Đoạn 1:
```javascript
  1
  2
  3
  2
  2
```
  -> Giải thích: Biến `count` được giữ lại nhờ Closure.
    ```javascript
    increment() -> 1
    increment() -> 2
    increment() -> 3
    decrement() -> 2
    getCount() -> 2
    ```
- Đoạn 2:
```javascript
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```
  -> Giải thích:
    #### var
    `var` có function scope.
    Sau khi vòng lặp kết thúc:
    ```javascript
    i = 3
    ```
    Cả 3 callback đều tham chiếu cùng một biến `i`.
    ---   
    #### let
    `let` có block scope.
    Mỗi vòng lặp tạo một biến mới:
    ```javascript
    j = 0
    j = 1
    j = 2
    ```
    Nên callback nhớ đúng giá trị tương ứng.

## Câu A3 (5đ) — Array Methods
Đọc chương 06. Cho mảng: const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Viết 1 dòng code cho mỗi yêu cầu (dùng arrow function):
```javascript
//Cho trước mảng dữ liệu gốc
const nums = [1,2,3,4,5,6,7,8,9,10];
```
### 1. Lấy các số chẵn
```javascript
const cau1 = nums.filter(n => n % 2 === 0);
```

### 2. Nhân mỗi số với 3
```javascript
const cau2 = nums.map(n => n * 3);
```

### 3. Tính tổng tất cả
```javascript
const cau3 = nums.reduce((sum, n) => sum + n, 0);
```

### 4. Tìm số đầu tiên > 7
```javascript
const cau4 = nums.find(n => n > 7);
```

### 5. Kiểm tra có số > 10 không?
```javascript
const cau5 = nums.some(n => n > 10);
```

### 6. Kiểm tra tất cả đều > 0?
```javascript
const cau6 = nums.every(n => n > 0);
```

### 7. Tạo mảng mô tả "Số X là [chẵn/lẻ]"
```javascript
const cau7 = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```

### 8. Đảo ngược mảng (không mutate gốc)
```javascript
const cau8 = [...nums].reverse();
```

## Câu A4 (5đ) — Object Destructuring & Spread
Không chạy code, dự đoán output:
```
// 1. Destructuring
console.log(name, price, ram, color);  // Output: "iPhone 16" 25990000 8 "Titan"
console.log(specs);                    // Output: ReferenceError: specs is not defined
// Giải thích: Cú pháp specs: { ram, color } nghĩa là bóc tách sâu vào trong specs, 
// chỉ tạo ra biến 'ram' và 'color', biến 'specs' không hề được định nghĩa bên ngoài.

// 2. Spread
console.log(updated.price);            // Output: 23990000 (đã bị ghi đè thành công)
console.log(updated.sale);             // Output: true
console.log(product.price);            // Output: 25990000 (Mảng gốc KHÔNG đổi vì spread tạo object mới nông)

// 3. Spread gotcha (Shallow copy)
console.log(product.specs.ram);        // Output: 16
// Giải thích tại sao: Toán tử spread (...) chỉ thực hiện sao chép nông (Shallow Copy). 
// Nó chỉ sao chép các thuộc tính ở tầng bề mặt. Đối với các object lồng nhau bên trong như 'specs', 
// cả hai object 'product' và 'copy' đều trỏ chung về một địa chỉ vùng nhớ của object 'specs' đó. 
// Do vậy thay đổi 'copy.specs.ram' sẽ vô tình làm thay đổi luôn cả 'product.specs.ram'.
```

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Refactor Code
Viết lại thành ≤ 10 dòng dùng filter, map, sort, destructuring, arrow functions.
```javascript
const processOrders = orders =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```
## Câu C2 (10đ) — Thiết kế API
```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

// Test phải pass:
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
```
