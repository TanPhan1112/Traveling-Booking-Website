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

    const tourListTn = document.querySelector(".listtourtn");
    tourListTn.textContent = "";

    if (tours === null) {
        tourListNn.textContent = "Không có dữ liệu tour.";
        tourListTn.textContent = "Không có dữ liệu tour.";
    } else if (tours.length === 0) {
        tourListNn.textContent = "Không có dữ liệu tour.";
        tourListTn.textContent = "Không có dữ liệu tour.";
    } else {
        tours.forEach(({ title, price, duration, start_date, end_date, location, description, available_slots, category_id, images }) => {
            if (category_id === 2) {
                const tourNnCard = document.createElement("div");
                tourNnCard.classList.add("tournn-card");
                tourNnCard.innerHTML = `
                    <img src="${images}" alt="${location}">
                    <h1>${title}</h1>
                    <h3>Điểm đến: ${location} (${description})</h3>
                    <p>Ngày đi: ${start_date}</p>
                    <p>Ngày về: ${end_date} <span style="color:red;">(${duration})</span></p>
                    <p>Giá: ${price}</p>
                    <p>Số chỗ còn nhận: ${available_slots}</p>
            `;
                tourListNn.appendChild(tourNnCard);
            } else if (category_id === 1) {
                const tourTnCard = document.createElement("div");
                tourTnCard.classList.add("tourtn-card");
                tourTnCard.innerHTML = `
                    <img src="" alt="${location}">
                    <h1>${title}</h1>
                    <h3>Điểm đến: ${location} (${description})</h3>
                    <p>Ngày đi: ${start_date}</p>
                    <p>Ngày về: ${end_date} <span style="color:red;">(${duration})</span></p>
                    <p>Giá: ${price}</p>
                    <p>Số chỗ còn nhận: ${available_slots}</p>
            `;
                tourListTn.appendChild(tourTnCard);
            } else {
                tourListNn.textContent = "Không có dữ liệu tour.";
                tourListTn.textContent = "Không có dữ liệu tour.";
            }
        });
    }
}

fetchTours().then((data) => displayTours(data));