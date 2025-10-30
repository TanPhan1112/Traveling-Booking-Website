document.addEventListener('DOMContentLoaded', () => {
    const popupContainer = document.getElementById('popup-container');
    const closeButton = document.getElementById('close-popup');

    // Kiểm tra xem popup đã hiển thị chưa
    if (localStorage.getItem('popupShown')) {
        popupContainer.style.display = 'none';
    } else {
        // Hiển thị popup lần đầu
        popupContainer.style.display = 'block';
        localStorage.setItem('popupShown', 'true');
    }

    // Đóng popup khi nhấn nút close
    closeButton.addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });

    // Đóng popup khi click ra ngoài
    window.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = 'none';
        }
    });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

const search = document.querySelector("#search");

async function searching(departure, arrival, startDate, endDate) {
    try {
        const response = await fetch(`http://localhost:3000/tours?departure_location=${departure}&arrival_location=${arrival}&start_date=${startDate}&end_date=${endDate}`);
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

search.addEventListener('submit', async (e) => {
    e.preventDefault();

    const departure = document.querySelector("#departure");
    const arrival = document.querySelector("#arrival");
    const startDate = document.querySelector("#startdate");
    const endDate = document.querySelector("#enddate");
    const result = document.querySelector(".result");
    result.setAttribute("style", "display: block;");

    const searched = await searching(departure.value, arrival.value, startDate.value, endDate.value);

    if (Object.keys(searched).length > 4) {
        const resultList = document.querySelector(".listresult");
        resultList.setAttribute("style", "overflow-x: auto;");
    } else {
        const resultList = document.querySelector(".listresult");
        resultList.setAttribute("style", "overflow-x: clip;");
    }

    displayResult(searched);
});

function displayResult(searched_tours) {
    const result = document.querySelector(".listresult");
    result.textContent = "";

    if (searched_tours === null) {
        result.textContent = "Không có dữ liệu tour.";
    } else if (searched_tours.length === 0) {
        result.textContent = "Không có dữ liệu tour.";
    } else {
        searched_tours.forEach(({ id, title, price, duration, location, departure_location, arrival_location, images }) => {
            const tourResultCard = document.createElement("div");
            tourResultCard.classList.add("result-card");
            tourResultCard.innerHTML = `
                <div><img src="${images}" alt="${location}"></div>
                <div>
                    <a style="text-decoration:none;" href="detail.html?id=${id}"><h2>${title}</h2></a>
                    <p>Điểm đi: <strong>${departure_location}</strong></p>
                    <p>Điểm đến: <strong>${arrival_location}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                    <p>Giá: <span style="color:red;font-weight:bolder;">${price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })}</span></p>
                </div>
            `;
            result.appendChild(tourResultCard);
        });
    }
}

async function fetchFeaturedTours() {
    try {
        const response = await fetch(`http://localhost:3000/featured_tours`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const ft_tours = await response.json();
        const randomFt_tours = ft_tours.sort(() => 0.5 - Math.random()).slice(0, 4);
        return randomFt_tours;
    } catch (error) {
        const errorMsg = document.querySelector("#errorTour");
        errorMsg.textContent = "Lỗi Fetch API:" + error;
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

function displayFeaturedTours(ft_tours) {
    const tourListNb = document.querySelector(".listtournb");
    tourListNb.textContent = "";

    if (ft_tours === null) {
        tourListNb.textContent = "Không có dữ liệu tour.";
    } else if (ft_tours.length === 0) {
        tourListNb.textContent = "Không có dữ liệu tour.";
    } else {
        ft_tours.forEach(({ id, title, price, duration, location, departure_location, arrival_location, image }) => {
            const tourNbCard = document.createElement("div");
            tourNbCard.classList.add("tournb-card");
            tourNbCard.innerHTML = `
                <div><img src="${image}" alt="${location}"></div>
                <div>
                    <a style="text-decoration:none;" href="detail.html?id=${id}"><h2>${title}</h2></a>
                    <p>Điểm đi: <strong>${departure_location}</strong></p>
                    <p>Điểm đến: <strong>${arrival_location}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                    <p>Giá: <span style="color:red;font-weight:bolder;">${price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })}</span></p>
                </div>
            `;
            tourListNb.appendChild(tourNbCard);
        });
    }
}

async function fetchTours() {
    try {
        const response = await fetch(`http://localhost:3000/tours`);
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
    const tourListNn = document.querySelector(".listtournn");
    tourListNn.textContent = "";

    const tourListTn = document.querySelector(".listtourtn");
    tourListTn.textContent = "";

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
                        <p>Số chỗ còn nhận: <strong>${available_slots}</strong></p>
                    </div>
            `;
                tourListNn.appendChild(tourNnCard);
            } else if (category_id === 1) {
                const tourTnCard = document.createElement("div");
                tourTnCard.classList.add("tourtn-card");
                tourTnCard.innerHTML = `
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

function displayFavourTours(fav_tours) {
    const tourListFav = document.querySelector(".listtourfav");
    tourListFav.textContent = "";

    if (fav_tours === null) {
        tourListFav.textContent = "Không có dữ liệu tour.";
    } else if (fav_tours.length === 0) {
        tourListFav.textContent = "Không có dữ liệu tour.";
    } else {
        let i = 0;

        fav_tours.forEach(({ images, location }) => {
            const tourFavCard = document.createElement("div");
            tourFavCard.classList.add(`item${i++}`);
            tourFavCard.innerHTML = `
                <img src="${images}" alt="${location}">
            `;
            tourListFav.appendChild(tourFavCard);
        });
    }
}

fetchFeaturedTours().then((data) => displayFeaturedTours(data));
fetchTours().then((data) => displayTours(data));
fetchTours().then((data) => displayFavourTours(data));