const checkbox = document.getElementById('currencyCheckbox');
const priceElement = document.querySelector('.room-price');

var usdRate = 82
var Nu = 4500
priceElement.innerHTML = `Nu. ${Nu}`
checkbox.addEventListener('change', function () {

    if (checkbox.checked) {
        const convertedPrice = Nu / usdRate;
        priceElement.innerText = `$ ${convertedPrice.toFixed(2)}`;
    } else {
        const convertedPrice = Nu;
        priceElement.innerText = `Nu. ${convertedPrice.toFixed(0)}`;
    }
});




//booking 
document.getElementById("roomDiv").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "block";
});

// Close the modal when clicking outside it
window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        display()
    }
});

// for number of rooms
const increaseRoom = document.getElementById("increaseRooms");
const decreaseRoom = document.getElementById("decreaseRooms");
const roomInput = document.getElementById("roomCount");

increaseRoom.addEventListener("click", () => {
    roomInput.value = parseInt(roomInput.value) + 1;
});

decreaseRoom.addEventListener("click", () => {
    if (roomInput.value != 1) {
        roomInput.value = parseInt(roomInput.value) - 1;
    }
});

// for nummber of adults
const increaseAdult = document.getElementById("increaseAdults");
const decreaseAdult = document.getElementById("decreaseAdults");
const adultInput = document.getElementById("adultCount");

increaseAdult.addEventListener("click", () => {
    if (adultInput.value != 3 * parseInt(roomInput.value)) {
        adultInput.value = parseInt(adultInput.value) + 1;
    }
});

decreaseAdult.addEventListener("click", () => {
    if (adultInput.value != 1) {
        adultInput.value = parseInt(adultInput.value) - 1;
    }
});

//for number of children
const increaseChild = document.getElementById("increaseChildren");
const decreaseChild = document.getElementById("decreaseChildren");
const childInput = document.getElementById("childCount");

increaseChild.addEventListener("click", () => {
    if (childInput.value != 2) {
        childInput.value = parseInt(childInput.value) + 1;
    }
});

decreaseChild.addEventListener("click", () => {
    if (childInput.value != 0) {
        childInput.value = parseInt(childInput.value) - 1;
    }
});

// display
function display() {
    const value = `${adultInput.value} Adults,${childInput.value} Children, ${roomInput.value} Rooms`
    document.getElementById("rooms").innerHTML = value
    // document.getElementById("rooms").getElementsByTagName("span")[0].innerHTML = room
}
