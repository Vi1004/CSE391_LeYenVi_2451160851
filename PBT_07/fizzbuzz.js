// ====== Version 1: Classic ======
function classicFizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// ====== Version 2: Custom mở rộng linh hoạt ======
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let outputString = "";

        // Kiểm tra tuần tự qua cấu trúc mảng rules động
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                outputString += rules[j].word;
            }
        }

        // Nếu không thỏa mãn bất cứ quy tắc nào, in ra con số hiện tại
        if (outputString === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${outputString}"`);
        }
    }
}

// Chạy test kiểm thử Version 2
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);