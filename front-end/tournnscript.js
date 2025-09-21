// async function fetchCategories() {
//     try {
//         const response = await fetch('http://localhost:3000/categories');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const categories = await response.json();
//         return categories;
//     } catch (error) {
//         const errorMsg = document.querySelector("#errorFetchCategories");
//         errorMsg.textContent = "Lỗi Fetch API:" + error;
//         console.error("Lỗi Fetch API:", error);
//         return null;
//     }
// }

window.onscroll = function () { myFunction() };

var header = document.getElementById("mysecondmenu");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

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
    const tourListNn = document.querySelector(".listtournn");
    tourListNn.textContent = "";

    if (tours === null) {
        tourListNn.textContent = "Không có dữ liệu tour.";
    } else if (tours.length === 0) {
        tourListNn.textContent = "Không có dữ liệu tour.";
    } else {
        tours.forEach(({ title, price, duration, start_date, end_date, location, description, available_slots, category_id, images }) => {
            if (category_id === 2) {
                const tourNnCard = document.createElement("div");
                tourNnCard.classList.add("tournn-card");
                tourNnCard.innerHTML = `
                    <img src="${images}" alt="${location}">
                    <div>
                        <h2>${title}</h2>
                        <h3>Điểm đến: ${location} (${description})</h3>
                        <p>Ngày đi: <strong>${start_date}</strong></p>
                        <p>Ngày về: <strong>${end_date}</strong> <span style="color:red;font-weight:bolder;">(${duration})</span></p>
                        <p>Giá: <span style="color:red;font-weight:bolder;">${price}đ</span></p>
                        <div class="detail">
                            <p>Số chỗ còn nhận: <strong>${available_slots}</strong></p>
                            <button style="color:red;font-weight:bolder;">XEM CHI TIẾT</button>
                        </div>
                    </div>
            `;
                tourListNn.appendChild(tourNnCard);
            }
        });
    }
}

fetchTours().then((data) => displayTours(data));