const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherDisplay = document.querySelector("#weatherDisplay");
const historyContainer = document.querySelector("#historyContainer");

let searchHistory = JSON.parse(localStorage.getItem("weather_history")) || [];

const saveHistory = (city) => {
    city = city.trim();
    if (!city) return;
    // Chuẩn hóa chữ hoa đầu từ
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    
    searchHistory = searchHistory.filter(item => item !== city);
    searchHistory.unshift(city);
    if (searchHistory.length > 5) searchHistory.pop(); // Giữ tối đa 5 thành phố

    localStorage.setItem("weather_history", JSON.stringify(searchHistory));
    renderHistory();
};

const renderHistory = () => {
    historyContainer.innerHTML = "";
    searchHistory.forEach(city => {
        const btn = document.createElement("button");
        btn.className = "history-tag";
        btn.textContent = city;
        btn.addEventListener("click", () => fetchWeather(city));
        historyContainer.appendChild(btn);
    });
};

const fetchWeather = async (city) => {
    if (!city.trim()) return;

    // State 1: LOADING STATE
    weatherDisplay.innerHTML = `<div class="loading">⏳ Đang tải dữ liệu thời tiết cho ${city}...</div>`;

    try {
        // Sử dụng API Open-Meteo kết hợp Geocoding để tìm tọa độ thành phố bất kỳ
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en`);
        if (!geoRes.ok) throw new Error("Lỗi kết nối máy chủ dữ liệu.");
        
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Không tìm thấy thành phố nào có tên "${city}".`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Lấy thời tiết live theo tọa độ tìm được
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`);
        if (!weatherRes.ok) throw new Error("Không thể tải dữ liệu thời tiết.");
        
        const weatherData = await weatherRes.json();
        const current = weatherData.current_weather;

        // State 2: SUCCESS STATE
        weatherDisplay.innerHTML = `
            <div class="weather-result">
                <h3>${name}, ${country}</h3>
                <div class="temp">${Math.round(current.temperature)}°C</div>
                <div class="info-row">
                    <span>💨 Gió: ${current.windspeed} km/h</span>
                    <span>🧭 Hướng: ${current.winddirection}°</span>
                </div>
            </div>
        `;
        saveHistory(city);
    } catch (error) {
        // State 3: ERROR STATE
        weatherDisplay.innerHTML = `
            <div class="error-msg">
                ❌ Lỗi: ${error.message}<br><small>Vui lòng kiểm tra lại mạng hoặc tên thành phố.</small>
            </div>
        `;
    }
};

searchBtn.addEventListener("click", () => {
    fetchWeather(cityInput.value);
    cityInput.value = "";
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchWeather(cityInput.value);
        cityInput.value = "";
    }
});

// Khởi chạy nạp lịch sử cũ
renderHistory();