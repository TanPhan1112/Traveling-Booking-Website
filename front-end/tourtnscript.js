const filterSearch = document.querySelector("#filterSearch");

async function filtering(myRange, departure, arrival, startDate, endDate) {
    try {
        const response = await fetch(`http://localhost:3000/tours?category_id=1&price_lte=${myRange}&departure_location=${departure}&arrival_location=${arrival}&start_date=${startDate}&end_date=${endDate}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

filterSearch.addEventListener('submit', async (e) => {
    e.preventDefault();

    const myRange = document.querySelector("#myRange");
    const departure = document.querySelector("#departure");
    const arrival = document.querySelector("#arrival");
    const startDate = document.querySelector("#startdate");
    const endDate = document.querySelector("#enddate");

    const filtered = await filtering(myRange.value, departure.value, arrival.value, startDate.value, endDate.value);

    displayTours(filtered);
});

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