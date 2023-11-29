// Elements
const warning = document.getElementById("warning");
const updateForm = document.getElementById("updateForm");
const roomType = document.getElementById("roomType");
const adultNumber = document.getElementById("adultNumber");
const nextMonth = document.getElementById("nextMonth")
const prevMonth = document.getElementById("prevMonth")
const roomAvailable = document.getElementById("roomAvailable")
const roomPrice = document.getElementById("roomPrice")
const confirmBtn = document.getElementById("confirm")
const resetBtn = document.getElementById("reset")
const loader = document.getElementById("loading-container")
const loadHideElements = document.querySelectorAll('.loadHide');
// Constants for tracking calendar info
let date = new Date,
    year = date.getFullYear(),
    Month = date.getMonth()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const monthElement = document.getElementById("month")
const dayWrapper = document.querySelector("#dayWrapper")

// Variable to track selected dates
let startDate = ""
let endDate = ""
let roomDetails;
let bookings;
let admins = [];

let customBookings;


async function fetchData() {
    try {
        var getadmins = await axios({
            method: "GET",
            url: "http://localhost:4001/api/admin/"
        })
        
        const alladmins = getadmins.data.data
        alladmins.forEach(admin => {
            admins.push(admin)
        })

        admins.forEach(admin => {
            if(document.cookie.includes(admin._id)){
                document.getElementById('adminName').innerHTML = admin.name
            }
        })

        var res = await axios({
            method: "GET",
            url: "http://localhost:4001/api/roomtypes",
        });
        roomDetails = res.data.data.roomType
        var res = await axios({
            method: "GET",
            url: "http://localhost:4001/api/bookings"
        })
        bookings = res.data.data
        var res = await axios({
            method: "GET",
            url: "http://localhost:4001/api/customBooking"
        })
        customBookings = res.data.data

        generateCalendar()

    } catch (err) {
        let message =
            typeof err.response !== "undefined"
                ? err.response.data.message
                : err.message;
        alert(message)
    }
};

function resetDates() {
    startDate = ""
    endDate = ""
    document.getElementById("startDate").value = ""
    document.getElementById("endDate").value = ""
}
const selectBtn = document.getElementById("selectBtn")


function generateDayElement(date, roomCount, price) {
    // Create the day element
    const day = document.createElement('div');
    day.classList.add('day');
    // Create the date element
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('date');
    const dateText = document.createElement('p');
    dateText.textContent = date;
    dateWrapper.appendChild(dateText);

    // Create the details element
    const details = document.createElement('div');
    details.classList.add('details');

    // Create the room element
    const room = document.createElement('div');
    room.classList.add('room');
    const roomText = document.createElement('p');
    roomText.innerHTML = `<span>${roomCount} </span>Rooms`;
    room.appendChild(roomText);

    // Create the price element
    const priceWrapper = document.createElement('div');
    priceWrapper.classList.add('price');
    const priceText = document.createElement('p');
    priceText.textContent = "Nu " + price;
    priceWrapper.appendChild(priceText);

    // Append the date, room, and price elements to the details element
    details.appendChild(room);
    details.appendChild(priceWrapper);

    // Append the date and details elements to the day element
    day.appendChild(dateWrapper);
    day.appendChild(details);

    return day.outerHTML;
}
function generateCustomBookedDayElement(date, roomCount, price) {
    // Create the day element
    const day = document.createElement('div');
    day.classList.add('day');
    day.classList.add("customBooked")
    // Create the date element
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('date');
    const dateText = document.createElement('p');
    dateText.textContent = date;
    dateWrapper.appendChild(dateText);

    // Create the details element
    const details = document.createElement('div');
    details.classList.add('details');

    // Create the room element
    const room = document.createElement('div');
    room.classList.add('room');
    const roomText = document.createElement('p');
    roomText.innerHTML = `<span>${roomCount} </span>Rooms`;
    room.appendChild(roomText);

    // Create the price element
    const priceWrapper = document.createElement('div');
    priceWrapper.classList.add('price');
    const priceText = document.createElement('p');
    priceText.textContent = "Nu " + price;
    priceWrapper.appendChild(priceText);

    // Append the date, room, and price elements to the details element
    details.appendChild(room);
    details.appendChild(priceWrapper);

    // Append the date and details elements to the day element
    day.appendChild(dateWrapper);
    day.appendChild(details);

    return day.outerHTML;
}

function generateActiveDayElement(date, roomCount, price) {
    // Create the day element
    const day = document.createElement('div');
    day.classList.add('day');
    day.classList.add('active');

    // Create the date element
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('date');
    const dateText = document.createElement('p');
    dateText.textContent = date;
    dateWrapper.appendChild(dateText);

    // Create the details element
    const details = document.createElement('div');
    details.classList.add('details');

    // Create the room element
    const room = document.createElement('div');
    room.classList.add('room');
    const roomText = document.createElement('p');
    roomText.innerHTML = `<span>${roomCount} </span>Rooms`;
    room.appendChild(roomText);

    // Create the price element
    const priceWrapper = document.createElement('div');
    priceWrapper.classList.add('price');
    const priceText = document.createElement('p');
    priceText.textContent = "Nu " + price;
    priceWrapper.appendChild(priceText);

    // Append the date, room, and price elements to the details element
    details.appendChild(room);
    details.appendChild(priceWrapper);

    // Append the date and details elements to the day element
    day.appendChild(dateWrapper);
    day.appendChild(details);

    return day.outerHTML;
}


async function generateCalendar() {
    // Show the loader before starting the calendar generation
    if (loader.classList.contains("hide")) {
        loader.classList.remove("hide");
        for (const element of loadHideElements) {
            element.classList.add("hide");
        }
    }

    // Hide all elements with class "loadHide" initially



    document.getElementById('subHeader').textContent = adultNumber.value
    document.getElementById("Header").textContent = roomType.value;
    var rooms;
    var price;
    Object.entries(roomDetails).forEach(([key, value]) => {
        // console.log(value.name)
        // console.log(value.name, roomType.value)
        if (value.name === roomType.value) {
            rooms = value.numberOfRooms
            if (adultNumber.value === "Single") {
                price = value.singlePrice
            }
            if (adultNumber.value === "Double") {
                price = value.doublePrice
            }
            if (adultNumber.value === "Triple") {
                price = value.triplePrice
            }
        }
    });
    monthElement.textContent = months[Month] + " " + year
    let lastDateOfMonth = new Date(year, Month + 1, 0).getDate() //Gets the last date of the Month
    let FirstDayOfMonth = new Date(year, Month, 1).getDay() //Gets the first date of the Month
    let LastDayOfMonth = new Date(year, Month, lastDateOfMonth).getDay() //Gets the last date of the Last Month
    let dayWrapperContent = '';

    for (let i = FirstDayOfMonth; i > 0; i--) {
        dayWrapperContent += `<div class="day inactive"></div>`
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        var tempRoom = rooms
        // Removing booked rooms
        var currentDay = new Date(year, Month, i)
        Object.entries(bookings).forEach(([key, value]) => {
            if (value.roomType === roomType.value) {
                var checkinBooking = new Date(value.checkinDate)
                var checkoutBooking = new Date(value.checkoutDate)
                checkinBooking.setHours(0, 0, 0, 0);
                checkoutBooking.setHours(0, 0, 0, 0);

                if (currentDay >= checkinBooking && currentDay <= checkoutBooking) {

                    let bookedRooms = value.totalRoomTypes.split(', ')
                    tempRoom -= parseInt(bookedRooms[0][0])

                    tempRoom -= parseInt(bookedRooms[1][0])

                    tempRoom -= parseInt(bookedRooms[2][0])

                }
            }
        })
        if (startDate != "") {
            var startYear = startDate.split("-")[0]
            var startMonth = startDate.split("-")[1]
            var dateStart = startDate.split("-")[2]
            var endYear = endDate.split("-")[0]
            var endMonth = endDate.split("-")[1]
            var dateEnd = endDate.split("-")[2]
            const startDateObj = new Date(startYear, startMonth - 1, dateStart);
            const endDateObj = new Date(endYear, endMonth - 1, dateEnd);
            const targetDateObj = new Date(year, Month, i);


            // if (targetDateObj >= startDateObj && targetDateObj <= endDateObj) {
            //     dayWrapperContent += generateActiveDayElement(i, tempRoom, price)
            // }
            var status = 0
            Object.entries(customBookings).forEach(([key, value]) => {
                if (value.roomType === roomType.value) {
                    var startDateCustom = new Date(value.startDate)
                    var endDateCustom = new Date(value.endDate)
                    var customRoom = tempRoom - value.rooms
                    startDateCustom.setHours(0, 0, 0, 0);
                    endDateCustom.setHours(0, 0, 0, 0);
                    if (currentDay >= startDateCustom && currentDay <= endDateCustom) {
                        if (targetDateObj >= startDateObj && targetDateObj <= endDateObj) {
                            if (value.adultNumber === adultNumber.value) {
                                dayWrapperContent += generateActiveDayElement(i, customRoom, value.price)
                            } else {
                                dayWrapperContent += generateActiveDayElement(i, customRoom, price)
                            }
                            status = 1

                        } else {
                            if (value.adultNumber === adultNumber.value) {
                                dayWrapperContent += generateCustomBookedDayElement(i, customRoom, value.price)
                            } else {
                                dayWrapperContent += generateCustomBookedDayElement(i, customRoom, price)
                            }
                            status = 1;
                        }
                    }
                }
            })
            if (status == 0) {
                if (targetDateObj >= startDateObj && targetDateObj <= endDateObj) {
                    dayWrapperContent += generateActiveDayElement(i, tempRoom, price)
                } else {
                    dayWrapperContent += generateDayElement(i, tempRoom, price)
                }
            }
        } else {
            var status = 0 // To track the if the date has been added or not 
            Object.entries(customBookings).forEach(([key, value]) => {
                if (value.roomType === roomType.value) {
                    var startDateCustom = new Date(value.startDate)
                    var endDateCustom = new Date(value.endDate)
                    var customRoom = tempRoom - value.rooms
                    // startDateCustom.setHours(0, 0, 0, 0);
                    endDateCustom.setHours(0, 0, 0, 0);

                    if (currentDay >= startDateCustom && currentDay <= endDateCustom) {
                        if (value.adultNumber === adultNumber.value) {
                            dayWrapperContent += generateCustomBookedDayElement(i, customRoom, value.price)
                        } else {
                            dayWrapperContent += generateCustomBookedDayElement(i, customRoom, price)

                        }
                        status = 1; //Update status to show date has been added

                    }
                }
            })
            if (status == 0) {

                dayWrapperContent += generateDayElement(i, tempRoom, price)
            }
        }
    }

    for (let i = LastDayOfMonth; i < 6; i++) {
        dayWrapperContent += `<div class="day inactive"></div>`
    }
    dayWrapper.innerHTML = dayWrapperContent
    if (!loader.classList.contains("hide")) {

        loader.classList.add("hide");

        for (const element of loadHideElements) {
            element.classList.remove("hide");
        }
    }
}


// Event Listeners
roomType.addEventListener("change", (e) => {

    resetDates();
    handleTripleOptionSwitch();
    if (!updateForm.classList.contains("hide")) {
        updateForm.classList.add("hide");
    }
    generateCalendar();
})
adultNumber.addEventListener("change", (e) => {
    resetDates();
    handleTripleOptionSwitch();
    if (!updateForm.classList.contains("hide")) {
        updateForm.classList.add("hide");
        console.log("form test");
    }
    generateCalendar();
})


nextMonth.addEventListener("click", (e) => {
    Month += 1
    if (Month < 0 || Month > 11) {
        date = new Date(year, Month);
        year = date.getFullYear();
        Month = date.getMonth();
    } else {
        date = new Date();
    }
    generateCalendar()
})
prevMonth.addEventListener("click", (e) => {
    Month -= 1
    if (Month < 0 || Month > 11) {
        date = new Date(year, Month);
        year = date.getFullYear();
        Month = date.getMonth();
    } else {
        date = new Date();
    }
    generateCalendar()
})
function handleTripleOptionSwitch() {
    const selectedRoomType = roomTypeSelect.value;
    const selectedAdultNumber = adultNumberSelect.value;

    // Find the option elements for "Triple" and "Single"
    const tripleOption = adultNumberSelect.querySelector('option[value="Triple"]');
    const singleOption = adultNumberSelect.querySelector('option[value="Single"]');

    if (selectedRoomType === 'Deluxe Room') {
        // If "Deluxe Room" is selected, hide the "Triple" option and select "Single"
        tripleOption.style.display = 'none';
        singleOption.selected = true;
    } else {
        // If any other room type is selected, show the "Triple" option
        tripleOption.style.display = '';
    }
}
// Getting the dates highlighted and displaying form
selectBtn.addEventListener("click", (e) => {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;

    // Date Verification
    if (startDate === "" || endDate === "") {
        console.log("warning");
        if (warning.classList.contains("hide")) {
            warning.classList.remove("hide");
        }
        return;
    } else {
        if (!warning.classList.contains("hide")) {
            warning.classList.add("hide");
        }
    }

    // Finding which room is set
    var roomAvailableTemp;
    Object.entries(roomDetails).forEach(([key, value]) => {
        if (value.name === roomType.value) {
            roomAvailableTemp = parseInt(value.numberOfRooms);
        }
    });

    var bookedTemp = 0;
    let startDateTemp = new Date(startDate);
    let endDateTemp = new Date(endDate);
    startDateTemp.setHours(0, 0, 0, 0);
    endDateTemp.setHours(0, 0, 0, 0);

    let currentDay = new Date(startDate);

    // Make sure the loop runs at least once when both start and end dates are the same
    do {
        let currentBooked = 0;
        Object.entries(bookings).forEach(([key, value]) => {
            if (value.roomType === roomType.value) {
                let bookStart = new Date(value.checkinDate);
                let bookEnd = new Date(value.checkoutDate);
                bookEnd.setHours(0, 0, 0, 0);
                bookStart.setHours(0, 0, 0, 0);
                if (currentDay >= bookStart && currentDay <= bookEnd) {
                    currentBooked += parseInt(value.totalRooms);
                };
            }
        });

        let customBooked = 0;
        Object.entries(customBookings).forEach(([key, value]) => {
            if (value.roomType === roomType.value) {
                let customStart = new Date(value.startDate);
                let customEnd = new Date(value.endDate);

                if (customStart <= currentDay && customEnd >= currentDay) {
                    if (value.rooms >= customBooked) {
                        customBooked = value.rooms;
                    }
                }
            }
        });

        let totalBooked = currentBooked + customBooked;
        if (totalBooked > bookedTemp) {
            bookedTemp = totalBooked;
        }

        // Increment the currentDay by one day for the next iteration
        currentDay.setDate(currentDay.getDate() + 1);
    } while (currentDay <= endDateTemp);

    console.log("CUSTOMBOOKING ROOMS", bookedTemp);

    roomAvailableTemp -= bookedTemp;
    roomAvailable.value = roomAvailableTemp;
    roomAvailable.setAttribute("max", roomAvailableTemp);
    if (updateForm.classList.contains("hide")) {
        updateForm.classList.remove("hide");
    }
    generateCalendar();
});



async function updateRequest(reqMethod, reqUrl, reqData) {
    try {
        const res = await axios({
            method: reqMethod,
            url: reqUrl,
            data: reqData,
        })
    } catch (err) {
        alert(err)
    }
}
async function noDataReq(reqMethod, reqUrl) {
    try {
        const res = await axios({
            method: reqMethod,
            url: reqUrl,
        })

    } catch (err) {
        alert(err)
    }
}
const showConfirmationDialog = async () => {
    const result = await Swal.fire({
        title: 'Are you sure you want to update?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });

    return result.isConfirmed; // Return true if the user clicks the "Yes, delete it!" button
};
const showConfirmationDialogReset = async () => {
    const result = await Swal.fire({
        title: 'Are you sure you want to reset?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });

    return result.isConfirmed; // Return true if the user clicks the "Yes, delete it!" button
};

confirmBtn.addEventListener("click", async (e) => {
    const confirmation = await showConfirmationDialog();
    if (confirmation) {

        console.log("CONFIRM BUTTON PRESSED")
        let customDates = []
        let rooms = roomAvailable.max - roomAvailable.value;
        let price = parseInt(roomPrice.value);
        let startDate = new Date(document.getElementById("startDate").value);
        let endDate = new Date(document.getElementById("endDate").value);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        // Update existing custom Bookings to prevent overlaps

        for (const [key, value] of Object.entries(customBookings)) {

            if (value.roomType === roomType.value) {
                let customStart = new Date(value.startDate);
                let customEnd = new Date(value.endDate);
                var dateRange = [value.startDate, value.endDate]
                customDates.push(dateRange)

                if (customEnd >= startDate && customEnd <= endDate && customStart < startDate) {

                    const jsStartString = new Date(startDate);
                    const jsEndString = new Date(endDate);
                    endDate = jsEndString.toISOString();
                    startDate = jsStartString.toISOString();
                    jsStartString.setDate(jsStartString.getDate() - 1)
                    let endDateUpdate = jsStartString.toISOString()
                    let dataUpdate, dataNew;
                    let priceUpdate;
                    if (value.adultNumber === adultNumber.value) {
                        priceUpdate = price
                    } else {
                        priceUpdate = value.price
                    }
                    dataUpdate = {
                        "startDate": value.startDate,
                        "endDate": endDateUpdate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.room,
                        "price": value.price
                    }
                    dataNew = {
                        "startDate": startDate,
                        "endDate": value.endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": rooms + parseInt(value.rooms),
                        "price": priceUpdate
                    }

                    updateRequest("PATCH", "http://localhost:4001/api/customBooking/" + value._id, dataUpdate)
                    updateRequest("POST", "http://localhost:4001/api/customBooking", dataNew)

                } else if (customStart >= startDate && customEnd <= endDate) {
                    let priceUpdate;
                    if (value.adultNumber === adultNumber.value) {
                        priceUpdate = price
                    } else {
                        priceUpdate = value.price
                    }
                    let dataNew = {
                        "startDate": value.startDate,
                        "endDate": value.endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": parseInt(value.rooms) + rooms,
                        "price": priceUpdate
                    }

                    updateRequest("PATCH", "http://localhost:4001/api/customBooking/" + value._id, dataNew)


                } else if (customStart >= startDate && customStart <= endDate && customEnd > endDate) {
                    // console.log("Second Update");
                    const jsStartString = new Date(startDate);
                    const jsEndString = new Date(endDate);
                    endDate = jsEndString.toISOString();
                    startDate = jsStartString.toISOString();
                    jsEndString.setDate(jsEndString.getDate() + 1)
                    let startDateUpdate = jsEndString.toISOString()
                    let dataUpdate, dataNew;
                    let priceUpdate;
                    if (value.adultNumber === adultNumber.value) {
                        priceUpdate = price
                    } else {
                        priceUpdate = value.price
                    }

                    dataNew = {
                        "startDate": value.startDate,
                        "endDate": endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": parseInt(value.rooms) + rooms,
                        "price": priceUpdate
                    }
                    dataUpdate = {
                        "startDate": startDateUpdate,
                        "endDate": value.endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.rooms,
                        "price": value.price
                    }

                    updateRequest('PATCH', "http://localhost:4001/api/customBooking/" + value._id, dataUpdate)
                    updateRequest("POST", "http://localhost:4001/api/customBooking/", dataNew)
                } else if (customStart <= startDate && customEnd >= endDate) {
                    // console.log("third Update");
                    const jsStartString = new Date(startDate);
                    const jsEndString = new Date(endDate);
                    endDate = jsEndString.toISOString();
                    startDate = jsStartString.toISOString();
                    jsEndString.setDate(jsEndString.getDate() + 1)
                    jsStartString.setDate(jsStartString.getDate() - 1)
                    let startDateUpdate = jsEndString.toISOString()
                    let endDateUpdate = jsStartString.toISOString()
                    let dataUpdateStart, dataUpdateEnd, dataNew;
                    let priceUpdate;
                    if (value.adultNumber === adultNumber.value) {
                        priceUpdate = price
                    } else {
                        priceUpdate = value.price
                    }

                    dataUpdateStart = {
                        "startDate": value.startDate,
                        "endDate": endDateUpdate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.rooms,
                        "price": value.price
                    }
                    dataUpdateEnd = {
                        "startDate": startDateUpdate,
                        "endDate": value.endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.rooms,
                        "price": value.price
                    }
                    dataNew = {
                        "startDate": startDate,
                        "endDate": endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": parseInt(value.rooms) + rooms,
                        "price": priceUpdate
                    }

                    updateRequest("PATCH", "http://localhost:4001/api/customBooking/" + value._id, dataUpdateStart)
                    updateRequest("POST", "http://localhost:4001/api/customBooking/", dataUpdateEnd)
                    updateRequest("POST", "http://localhost:4001/api/customBooking/", dataNew)
                }
            }
        }

        // Making custom bookings on new dates
        console.log("VALUE TEST", document.getElementById("startDate").value);
        var startDateString = document.getElementById("startDate").value;
        var endDateString = document.getElementById("endDate").value;

        // Parse the date string explicitly (assuming it's in the format "yyyy-mm-dd")
        var sDate = new Date(startDateString);
        var eDate = new Date(endDateString);
        var Ndate = new Date(startDateString);

        // Set the time to 00:00:00.000
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(0, 0, 0, 0);
        Ndate.setHours(0, 0, 0, 0);



        let customStart = "", customEnd = ""

        while (Ndate >= sDate && Ndate <= eDate) {
            var tracker = 0 // tracks overlaps

            // To check if the date is overlapping with a customBooking
            for (const dateArray of customDates) {
                let currentStart = new Date(dateArray[0])
                let currentEnd = new Date(dateArray[1])
                currentStart.setHours(0, 0, 0, 0);
                currentEnd.setHours(0, 0, 0, 0);

                if (Ndate >= currentStart && Ndate <= currentEnd) {
                    tracker = 1 // update to one when there is an overlap
                    // Checkes if there are any added date range 
                    if (customStart != "") {
                        postStart = new Date(customStart)
                        postEnd = new Date(customEnd)
                        postStart.setDate(postStart.getDate());
                        postEnd.setDate(postEnd.getDate());

                        postStart = postStart.toISOString();
                        postEnd = postEnd.toISOString();

                        dataNew = {
                            "startDate": postStart,
                            "endDate": postEnd,
                            "roomType": roomType.value,
                            "adultNumber": adultNumber.value,
                            "rooms": rooms,
                            "price": price
                        }
                        updateRequest("POST", "http://localhost:4001/api/customBooking/", dataNew)

                        customStart = ""
                        customEnd = ""
                    }
                    break;
                }

            }
            if (tracker == 0) {
                if (customStart == "") {
                    customStart = new Date(Ndate); // Create a new instance for customStart
                }
                customEnd = new Date(Ndate); // Create a new instance for customEnd
            }
            Ndate.setDate(Ndate.getDate() + 1);

        }
        if (customStart != "") {
            // POST req here
            postStart = new Date(customStart)
            postEnd = new Date(customEnd)
            postStart.setDate(postStart.getDate());
            postEnd.setDate(postEnd.getDate());

            postStart = postStart.toISOString();
            postEnd = postEnd.toISOString();
            dataNew = {
                "startDate": postStart,
                "endDate": postEnd,
                "roomType": roomType.value,
                "adultNumber": adultNumber.value,
                "rooms": rooms,
                "price": price
            }
            updateRequest("POST", "http://localhost:4001/api/customBooking/", dataNew)

        }
        Swal.fire(
            '',
            'Update Success',
            'success'
        );
        location.reload();

    } else {
        // Code for handling cancelation
    }
});
// Get references to the two select elements
const roomTypeSelect = document.getElementById('roomType');
const adultNumberSelect = document.getElementById('adultNumber');

// Call hideOptionByValue function on page load to hide the "Triple" option

resetBtn.addEventListener("click", async (e) => {
    const confirmation = await showConfirmationDialogReset();
    if (confirmation) {
        let startDate = new Date(document.getElementById("startDate").value);
        let endDate = new Date(document.getElementById("endDate").value);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        for (const [key, value] of Object.entries(customBookings)) {
            if (value.roomType === roomType.value) {
                let customStart = new Date(value.startDate);
                let customEnd = new Date(value.endDate);
                if (customEnd >= startDate && customEnd <= endDate && customStart < startDate) {
                    const jsStartString = new Date(startDate);
                    const jsEndString = new Date(endDate);
                    endDate = jsEndString.toISOString();
                    startDate = jsStartString.toISOString();
                    jsStartString.setDate(jsStartString.getDate() - 1)
                    let endDateUpdate = jsStartString.toISOString()
                    let dataUpdate;

                    dataUpdate = {
                        "startDate": value.startDate,
                        "endDate": endDateUpdate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.room,
                        "price": value.price
                    }
                    updateRequest("PATCH", "http://localhost:4001/api/customBooking/" + value._id, dataUpdate)
                }
                else if (customStart >= startDate && customEnd <= endDate) {
                    noDataReq("DELETE", "http://localhost:4001/api/customBooking/" + value._id)
                } else if (customStart >= startDate && customStart <= endDate && customEnd > endDate) {
                    alert("Third Clause")
                    const jsStartString = new Date(startDate);
                    const jsEndString = new Date(endDate);
                    endDate = jsEndString.toISOString();
                    startDate = jsStartString.toISOString();
                    jsEndString.setDate(jsEndString.getDate() + 1)
                    let startDateUpdate = jsEndString.toISOString()
                    let dataUpdate
                    dataUpdate = {
                        "startDate": startDateUpdate,
                        "endDate": value.endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.room,
                        "price": value.price
                    }
                    updateRequest("PATCH", "http://localhost:4001/api/customBooking/" + value._id, dataUpdate)
                } else if (customStart <= startDate && customEnd >= endDate) {
                    const jsStartString = new Date(startDate);
                    const jsEndString = new Date(endDate);
                    endDate = jsEndString.toISOString();
                    startDate = jsStartString.toISOString();
                    jsEndString.setDate(jsEndString.getDate() + 1)
                    jsStartString.setDate(jsStartString.getDate() - 1)
                    let startDateUpdate = jsEndString.toISOString()
                    let endDateUpdate = jsStartString.toISOString()
                    let dataUpdateStart, dataUpdateEnd;


                    dataUpdateStart = {
                        "startDate": value.startDate,
                        "endDate": endDateUpdate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.rooms,
                        "price": value.price
                    }
                    dataUpdateEnd = {
                        "startDate": startDateUpdate,
                        "endDate": value.endDate,
                        "roomType": value.roomType,
                        "adultNumber": value.adultNumber,
                        "rooms": value.rooms,
                        "price": value.price
                    }
                    updateRequest("PATCH", "http://localhost:4001/api/customBooking/" + value._id, dataUpdateStart)
                    updateRequest("POST", "http://localhost:4001/api/customBooking/", dataUpdateEnd)
                }

            }
        }
        Swal.fire(
            '',
            'Reset Success',
            'success'
        );
        location.reload();
    }

})
handleTripleOptionSwitch();


fetchData()

const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4001/api/admin/logout',
        })
        if (res.data.status === 'success') {
            location.reload(true)
        }
    } catch (err) {
        alert('Error Logging Out! Please Try Again.')
    }
}

var doc = document.querySelector('.logout-btn')

doc.addEventListener('click', (e) => logout()) 