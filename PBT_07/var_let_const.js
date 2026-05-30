console.log("Đoạn 1");
console.log(x);
var x = 5;

console.log("Đoạn 2");
try {
    console.log(y);
    let y = 10;
} catch (e) {
    console.log(e.message);
}

console.log("Đoạn 3");
try {
    const z = 15;
    z = 20;
} catch (e) {
    console.log(e.message);
}

console.log("Đoạn 4");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("Đoạn 5");
let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);