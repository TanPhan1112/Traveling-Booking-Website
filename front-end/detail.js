const url = new URL(window.location.href);
const searchParams = url.searchParams;
const id = searchParams.get('id');
let tour = null;

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

async function fetchTours() {
    try {
        const response = await fetch(`https://traveling-booking-website.onrender.com/tours?id=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tours = await response.json();
        tour = tours[0];
        return tours[0];
    } catch (error) {
        const errorMsg = document.querySelector("#errorTour");
        errorMsg.textContent = "Lỗi Fetch API:" + error;
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

function displayDetail(tours) {
    const tourDetail = document.querySelector(".tour-detail");
    tourDetail.textContent = "";

    if (tours === null) {
        tourDetail.textContent = "Không có dữ liệu tour.";
    } else if (tours.length === 0) {
        tourDetail.textContent = "Không có dữ liệu tour.";
    } else {
        const banner = document.querySelector("#banner");
        banner.innerHTML = `<img src="${tours.images}" alt="banner">`

        const tourTitle = document.querySelector(".title");
        tourTitle.innerHTML = tours.title + " - " + tours.location + " - " + tours.description;

        const tourDetailCard = document.createElement("div");
        tourDetailCard.classList.add("tourdetail-card");
        tourDetailCard.innerHTML = `
                <div>
                    <p style="font-size: 1rem;font-weight: bold;">${tours.title} - ${tours.location} (${tours.description})</p>
                    <p>Giá chỉ từ: <span style="color:red;font-weight:bolder;">${tours.price.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</span></p>
                    <p>Ngày đi: <strong>${tours.start_date}</strong></p>
                    <p>Ngày về: <strong>${tours.end_date}</strong> <span style="color:red;font-weight:bolder;">(${tours.duration})</span></p>                       
                    <p>Số chỗ còn nhận: <strong>${tours.available_slots}</strong></p>
                    <button onclick="bookTour()" id="book">Đặt chỗ ngay</button>
                </div>
            `;
        tourDetail.appendChild(tourDetailCard);
    }
}

fetchTours().then((data) => displayDetail(data));

const bookBtn = document.querySelector("#book");

function bookTour() {
    const foundItem = cart.find((item) => item.id === tour.id);
    if (foundItem) {
        alert("Tour đã đặt trùng, xin vui lòng chọn tour khác!");
    } else {
        cart.push(tour);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = `detail.html?id=${id}`;
    }
} 
