const url = new URL(window.location.href);
const searchParams = url.searchParams;
const id = searchParams.get('id');

async function fetchTours() {
    try {
        const response = await fetch(`http://localhost:3000/tours?id=${id}`);
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

function displayDetail(tours) {
    const tourListNn = document.querySelector(".detail");
    tourListNn.textContent = "";

    if (tours === null) {
        tourListNn.textContent = "Không có dữ liệu tour.";
        tourListTn.textContent = "Không có dữ liệu tour.";
    } else if (tours.length === 0) {
        tourListNn.textContent = "Không có dữ liệu tour.";
        tourListTn.textContent = "Không có dữ liệu tour.";
    } else {
        tours.forEach(({ id, title, price, duration, start_date, end_date, location, description, available_slots, category_id, images }) => {
            if (category_id === 2) {
                const tourNnCard = document.createElement("div");
                tourNnCard.classList.add("tournn-card");
                tourNnCard.innerHTML = `
                    <img src="${images}" alt="${location}">
                    <div>
                        <a href="detail.html?id=${id}"<h2>${title}</h2></a>
                        <h3>Điểm đến: ${location} (${description})</h3>
                        <p>Ngày đi: <strong>${start_date}</strong></p>
                        <p>Ngày về: <strong>${end_date}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                        <p>Giá: <span style="color:red;font-weight:bolder;">${price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                })}</span></p>
                        <p>Số chỗ còn nhận: <strong>${available_slots}</strong></p>
                    </div>
            `;
                tourListNn.appendChild(tourNnCard);
            } else if (category_id === 1) {
                const tourTnCard = document.createElement("div");
                tourTnCard.classList.add("tourtn-card");
                tourTnCard.innerHTML = `
                    <img src="${images}" alt="${location}">
                    <div>
                        <h2>${title}</h2>
                        <h3>Điểm đến: ${location} (${description})</h3>
                        <p>Ngày đi: <strong>${start_date}</strong></p>
                        <p>Ngày về: <strong>${end_date}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                        <p>Giá: <span style="color:red;font-weight:bolder;">${price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                })}</span></p>
                        <p>Số chỗ còn nhận: <strong>${available_slots}</strong></p>
                    </div>
            `;
                tourListTn.appendChild(tourTnCard);
            } else {
                tourListNn.textContent = "Không có dữ liệu tour.";
                tourListTn.textContent = "Không có dữ liệu tour.";
            }
        });
    }
}