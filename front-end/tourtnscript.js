var slider = document.getElementById("price");
var output = document.getElementById("value");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

async function fetchTours() {
    try {
        const response = await fetch('http://localhost:3000/tours');
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
        tours.forEach(({ title, price, duration, start_date, end_date, location, description, available_slots, category_id, images }) => {
            if (category_id === 1) {
                const tourCard = document.createElement("div");
                tourCard.classList.add("tour-card");
                tourCard.innerHTML = `
                    <img src="${images}" alt="${location}">
                    <div>
                        <h2>${title}</h2>
                        <h3>Điểm đến: ${location} (${description})</h3>
                        <p>Ngày đi: <strong>${start_date}</strong></p>
                        <p>Ngày về: <strong>${end_date}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                        <p>Giá: <span style="color:red;font-weight:bolder;">${price}đ</span></p>
                        <div class="detail">
                            <p>Số chỗ còn nhận: <strong>${available_slots}</strong></p>
                            <button style="font-weight:bolder;">XEM CHI TIẾT</button>
                        </div>
                    </div>
            `;
                tourList.appendChild(tourCard);
            }
        });
    }
}

fetchTours().then((data) => displayTours(data));