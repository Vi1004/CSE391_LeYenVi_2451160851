const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let highest = null;
let lowest = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

let maleTotal = 0;
let femaleTotal = 0;
let maleCount = 0;
let femaleCount = 0;

console.log("| STT | Tên | TB | Xếp loại |");
console.log("--------------------------------");

for (let i = 0; i < students.length; i++) {

    let s = students[i];

    let avg =
        s.math * 0.4 +
        s.physics * 0.3 +
        s.cs * 0.3;

    s.avg = avg;

    let rank = "";

    if (avg >= 8) {
        rank = "Giỏi";
        gioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    } else if (avg >= 5) {
        rank = "Trung bình";
        trungBinh++;
    } else {
        rank = "Yếu";
        yeu++;
    }

    console.log(
        `| ${i + 1} | ${s.name} | ${avg.toFixed(1)} | ${rank} |`
    );

    if (highest === null || avg > highest.avg) {
        highest = s;
    }

    if (lowest === null || avg < lowest.avg) {
        lowest = s;
    }

    totalMath += s.math;
    totalPhysics += s.physics;
    totalCS += s.cs;

    if (s.gender === "M") {
        maleTotal += avg;
        maleCount++;
    } else {
        femaleTotal += avg;
        femaleCount++;
    }
}

console.log("\n=== THỐNG KÊ ===");

console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

console.log(
    "\nSinh viên cao nhất:",
    highest.name,
    highest.avg.toFixed(2)
);

console.log(
    "Sinh viên thấp nhất:",
    lowest.name,
    lowest.avg.toFixed(2)
);

console.log("\nTB môn Toán:",
    (totalMath / students.length).toFixed(2)
);

console.log("TB môn Lý:",
    (totalPhysics / students.length).toFixed(2)
);

console.log("TB môn CS:",
    (totalCS / students.length).toFixed(2)
);

console.log(
    "\nTB Nam:",
    (maleTotal / maleCount).toFixed(2)
);

console.log(
    "TB Nữ:",
    (femaleTotal / femaleCount).toFixed(2)
);

