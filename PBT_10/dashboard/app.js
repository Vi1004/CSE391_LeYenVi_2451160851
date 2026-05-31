const refreshBtn = document.querySelector("#refreshBtn");
const loadTimeDisplay = document.querySelector("#loadTime");
const widgetsContents = [
    document.querySelector("#widget-0 .widget-content"),
    document.querySelector("#widget-1 .widget-content"),
    document.querySelector("#widget-2 .widget-content")
];

const setWidgetLoading = (index) => {
    widgetsContents[index].innerHTML = `<div class="loading">⏳ Đang đồng bộ API...</div>`;
};

const renderWidgetError = (index, errMsg) => {
    widgetsContents[index].innerHTML = `<div class="error-box">❌ Lỗi nạp dữ liệu: ${errMsg}</div>`;
};

const renderWidget = (index, data) => {
    const contentBox = widgetsContents[index];
    contentBox.innerHTML = "";
    
    if (index === 0) {
        // Xử lý Render Widget Users (Lấy 4 dòng đầu)
        data.slice(0, 4).forEach(u => {
            const div = document.createElement("div");
            div.className = "user-item";
            div.textContent = `👤 ${u.name} - ${u.email}`;
            contentBox.appendChild(div);
        });
    } else if (index === 1) {
        // Xử lý Render Widget Weather
        const cur = data.current_weather;
        contentBox.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:36px; font-weight:bold;">${cur.temperature}°C</div>
                <p style="color:#94a3b8; margin:5px 0;">Tốc độ gió: ${cur.windspeed} km/h</p>
            </div>
        `;
    } else if (index === 2) {
        // Xử lý Render Widget Country Info
        const country = data[0];
        contentBox.innerHTML = `
            <div>
                <p><strong>Quốc gia:</strong> ${country.name.official}</p>
                <p><strong>Thủ đô:</strong> ${country.capital[0]}</p>
                <p><strong>Dân số:</strong> ${country.population.toLocaleString()} người</p>
                <p><strong>Khu vực:</strong> ${country.region}</p>
            </div>
        `;
    }
};

async function loadDashboard() {
    const startTime = Date.now();
    loadTimeDisplay.textContent = "Đang quét dữ liệu toàn hệ thống...";
    
    // Đặt trạng thái loading cho cả 3 widget riêng biệt trước khi fetch
    widgetsContents.forEach((_, idx) => setWidgetLoading(idx));

    // Khởi chạy kích hoạt song song 3 API bằng Promise.allSettled để tránh chết dây chuyền
    const results = await Promise.allSettled([
        fetch("https://jsonplaceholder.typicode.com/users").then(r => { if(!r.ok) throw new Error(); return r.json(); }),
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then(r => { if(!r.ok) throw new Error(); return r.json(); }),
        fetch("https://restcountries.com/v3.1/name/vietnam").then(r => { if(!r.ok) throw new Error(); return r.json(); })
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, "Yêu cầu HTTP bị từ chối hoặc sai địa chỉ URL.");
        }
    });

    const endTime = Date.now();
    loadTimeDisplay.textContent = `Data loaded in ${endTime - startTime} ms`;
}

refreshBtn.addEventListener("click", loadDashboard);

// Tự động chạy tải giao diện lần đầu tiên mở dashboard
loadDashboard();