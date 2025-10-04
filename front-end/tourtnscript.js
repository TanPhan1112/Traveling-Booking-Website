const rangeInput = document.getElementById('myRange');
const rangeValueSpan = document.getElementById('rangeValue');

// Initial display
rangeValueSpan.textContent = parseInt(rangeInput.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', });

// Update display when the range input changes
rangeInput.addEventListener('input', () => {
    rangeValueSpan.textContent = parseInt(rangeInput.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', });
});

async function fetchTours() {
    try {
        const response = await fetch('http://localhost:3000/tours?category_id=1');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tours = await response.json();
        return tours;
    } catch (error) {
        const errorMsg = document.querySelector("#errorTour");
        errorMsg.textContent = "Lỗi Fetch API:" + error;
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

function displayTours(tours) {
    const tourList = document.querySelector(".tourlist");
    tourList.textContent = "";

    if (tours === null) {
        tourList.textContent = "Không có dữ liệu tour.";
    } else if (tours.length === 0) {
        tourList.textContent = "Không có dữ liệu tour.";
    } else {
        tours.forEach(({ id, title, price, duration, start_date, end_date, location, description, available_slots, images }) => {
            const tourCard = document.createElement("div");
            tourCard.classList.add("tour-card");
            tourCard.innerHTML = `
                <div><img src="${images}" alt="${location}"></div>
                <div>
                    <a style="text-decoration:none;" href="detail.html?id=${id}"><h2>${title}</h2></a>
                    <h3>Điểm đến: ${location} (${description})</h3>
                    <p>Ngày đi: <strong>${start_date}</strong></p>
                    <p>Ngày về: <strong>${end_date}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                    <p>Giá: <span style="color:red;font-weight:bolder;">${price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })}</span></p>
                    <div class="detail">
                        <p>Số chỗ còn nhận: <strong>${available_slots}</strong></p>
                        <button onclick="tourDetail(${id})" style="font-weight:bolder;">XEM CHI TIẾT</button>
                    </div>
                </div>
            `;
            tourList.appendChild(tourCard);
        });
    }
}

fetchTours().then((data) => displayTours(data));

function tourDetail(id) {
    window.location.href = `detail.html?id=${id}`;
}