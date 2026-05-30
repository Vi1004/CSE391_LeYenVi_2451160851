let secret = Math.floor(Math.random() * 100) + 1;

let attempts = 0;

let guessedNumbers = [];

while (attempts < 7) {

    let input = prompt("Nhập số từ 1 đến 100:");

    let guess = Number(input);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Chỉ được nhập số từ 1-100");
        continue;
    }

    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);

    attempts++;

    if (guess === secret) {
        alert(`Bạn đoán đúng sau ${attempts} lần!`);
        break;
    }

    if (guess < secret) {
        alert("Cao hơn");
    } else {
        alert("Thấp hơn");
    }
}

if (attempts === 7 && guessedNumbers[guessedNumbers.length - 1] !== secret) {
    alert(`Bạn thua! Đáp án là ${secret}`);
}