const rooms = [];
let roomBooked = {}
let mainObj = {}

let single = 0
let double = 0
let triple = 0

async function fetchData() {
  try {
    const getRooms = await axios({
      method: "GET",
      url: "https://ledger-trips.onrender.com/api/roomtypes",
    });

    const getRates = await axios({
      method: "GET",
      url: "https://ledger-trips.onrender.com/api/usdrate",
    });
    const rates = getRates.data.data;
    let usdRate = 0
    rates.forEach((rate) => {
      usdRate = rate.Rate
    })
    const allRooms = getRooms.data.data.roomType;
    const deluxeShow = getRooms.data.data.newSearch.deluxeShow;
    roomBooked = getRooms.data.data.newSearch.roomBooked
    console.log(deluxeShow)
    allRooms.forEach((room) => {
      if (deluxeShow == true) {
        rooms.push(room);
      } else {
        if (room.name !== "Deluxe Room") {
          rooms.push(room);
          const topMessage = document.getElementById('topMessage');
          topMessage.classList.remove("topMessage-hidden");
        }
      }
    });

    var len = rooms.length;
    for (var i = 0; i < len; i++) {
      // Last i elements are already in place
      for (var j = 0; j < len - i - 1; j++) {
        // Traverse the array from 0 to len-i-1
        // Swap if the element found is greater than the next element
        if (rooms[j].singlePrice > rooms[j + 1].singlePrice) {
          var temp = rooms[j];
          rooms[j] = rooms[j + 1];
          rooms[j + 1] = temp;
        }
      }
    }

    const checkinDate = getRooms.data.data.newSearch.checkinDate
    const checkoutDate = getRooms.data.data.newSearch.checkoutDate

    const getCustomBookings = async () => {
      try {
        const response = await axios.get("https://ledger-trips.onrender.com/api/customBooking");
        const bookings = response.data.data;
        bookings.forEach((data) => {
          if (checkinDate <= data.endDate && checkoutDate >= data.startDate) {
            if (!mainObj.hasOwnProperty(data.roomType)) {
              mainObj[data.roomType] = {};
            }
            if (data.adultNumber == "Single") {
              if (!mainObj[data.roomType].hasOwnProperty('singlePrice')) {
                mainObj[data.roomType]['singlePrice'] = 0;
                mainObj[data.roomType]['singleDays'] = 0;
              }
              if (checkinDate < data.startDate && checkoutDate > data.startDate && checkoutDate < data.endDate) {
                var day1 = new Date(data.startDate)
                var day2 = new Date(checkoutDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].singleDays += days;
                mainObj[data.roomType].singlePrice += days * data.price
              } else if (checkinDate > data.startDate && checkinDate < data.endDate && checkoutDate > data.endDate) {
                var day1 = new Date(checkinDate)
                var day2 = new Date(data.endDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].singleDays += days;
                mainObj[data.roomType].singlePrice += days * data.price
              } else if (checkinDate > data.startDate && checkoutDate < data.endDate) {
                var day1 = new Date(checkinDate)
                var day2 = new Date(checkoutDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].singleDays += days;
                mainObj[data.roomType].singlePrice += days * data.price
              } else if (checkinDate < data.startDate && checkoutDate > data.endDate) {
                var day1 = new Date(data.startDate)
                var day2 = new Date(data.endDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].singleDays += days;
                mainObj[data.roomType].singlePrice += days * data.price
              }
            } else if (data.adultNumber == "Double") {
              if (!mainObj[data.roomType].hasOwnProperty('doublePrice')) {
                mainObj[data.roomType]['doublePrice'] = 0;
                mainObj[data.roomType]['doubleDays'] = 0;
              }
              if (checkinDate < data.startDate && checkoutDate > data.startDate && checkoutDate < data.endDate) {
                var day1 = new Date(data.startDate)
                var day2 = new Date(checkoutDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].doubleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              } else if (checkinDate > data.startDate && checkinDate < data.endDate && checkoutDate > data.endDate) {
                var day1 = new Date(checkinDate)
                var day2 = new Date(data.endDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].doubleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              } else if (checkinDate > data.startDate && checkoutDate < data.endDate) {
                var day1 = new Date(checkinDate)
                var day2 = new Date(checkoutDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].doubleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              } else if (checkinDate < data.startDate && checkoutDate > data.endDate) {
                var day1 = new Date(data.startDate)
                var day2 = new Date(data.endDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].doubleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              }
            } else if (data.adultNumber == "Triple") {
              if (!mainObj[data.roomType].hasOwnProperty('triplePrice')) {
                mainObj[data.roomType]['triplePrice'] = 0;
                mainObj[data.roomType]['tripleDays'] = 0;
              }
              if (checkinDate < data.startDate && checkoutDate > data.startDate && checkoutDate < data.endDate) {
                var day1 = new Date(data.startDate)
                var day2 = new Date(checkoutDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].tripleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              } else if (checkinDate > data.startDate && checkinDate < data.endDate && checkoutDate > data.endDate) {
                var day1 = new Date(checkinDate)
                var day2 = new Date(data.endDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].tripleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              } else if (checkinDate > data.startDate && checkoutDate < data.endDate) {
                var day1 = new Date(checkinDate)
                var day2 = new Date(checkoutDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].tripleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              } else if (checkinDate < data.startDate && checkoutDate > data.endDate) {
                var day1 = new Date(data.startDate)
                var day2 = new Date(data.endDate)
                var time = Math.abs(day2.getTime() - day1.getTime());
                var days = Math.ceil(time / (1000 * 3600 * 24));
                mainObj[data.roomType].tripleDays += days;
                mainObj[data.roomType].doublePrice += days * data.price
              }
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    await getCustomBookings();

    rooms.forEach((room) => {
      console.log(room)
      var id = room._id;
      const div0 = document.getElementById("mainContainer");

      const div1 = document.createElement("div");
      div1.setAttribute("class", "room-container");
      div1.setAttribute("id", id);

      const div2 = document.createElement("div");

      const img = document.createElement("img");
      img.setAttribute("class", "room-image");
      img.setAttribute("id", "img" + id);

      const div3 = document.createElement("div");
      div3.setAttribute("class", "room-detail-container");

      const div4 = document.createElement("div");
      div4.setAttribute("class", "room-header");
      div4.setAttribute("id", "name" + id);

      const div5 = document.createElement("div");
      div5.setAttribute("class", "room-details");
      div5.setAttribute("id", "details" + id);

      const div6 = document.createElement("div");
      div6.setAttribute("class", "room-location");

      const icon = document.createElement("iconify-icon");
      icon.setAttribute("class", "room-location-icon");
      icon.setAttribute("id", "icon" + id);

      const div7 = document.createElement("div");
      div7.setAttribute("id", "location" + id);

      const div8 = document.createElement("div");
      div8.setAttribute("class", "room-price-container");

      const div9 = document.createElement("div");
      div9.setAttribute("class", "room-left");
      div9.setAttribute("id", "room-left" + id);

      const div10 = document.createElement("div");
      div10.setAttribute("class", "room-price");
      div10.setAttribute("id", "price" + id);

      const div11 = document.createElement("div");
      div11.setAttribute("class", "room-price-switcher");
      div11.setAttribute("onclick", "ignoreRedirect(event)")

      const label = document.createElement("label");
      label.setAttribute("class", "switch");

      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", "checkBox" + id);

      const span = document.createElement("span");
      span.setAttribute("class", "slider");

      const div12 = document.createElement("div");
      div12.setAttribute("id", "dollar" + id);

      const div13 = document.createElement("div");
      div13.setAttribute("id", "cancellation" + id);
      div13.setAttribute("class", "cancellation");
      div13.setAttribute("data-bs-toggle", "modal");
      div13.setAttribute("data-bs-target", "#cancellationModal");
      div13.setAttribute("onclick", "ignoreRedirect(event)")

      div0.appendChild(div1);
      div1.appendChild(div2);
      div2.appendChild(img);
      div1.appendChild(div3);
      div3.appendChild(div4);
      div3.appendChild(div5);
      div3.appendChild(div6);
      div6.appendChild(icon);
      div6.appendChild(div7);
      div1.appendChild(div8);
      div8.appendChild(div9);
      div8.appendChild(div10);
      div8.appendChild(div11);
      div11.appendChild(label);
      label.appendChild(input);
      label.appendChild(span);
      div11.appendChild(div12);
      div8.appendChild(div13)
      let url = room.photo;
      url = url.replace(/-\d+\.png$/, "");
      document.getElementById("img" + id).src = url;
      document.getElementById("name" + id).innerHTML = room.name;
      document.getElementById("details" + id).innerHTML = room.description;
      document.getElementById("icon" + id).icon = "mdi:location";
      document.getElementById("location" + id).innerHTML =
        "Thori Lam, Lower Motithang, Thimphu";
      document.getElementById("room-left" + id).innerHTML =
        "Only " + (room.numberOfRooms - roomBooked[room.name]) + " left";
      document.getElementById("price" + id).innerHTML = room.price;
      document.getElementById("dollar" + id).innerHTML = "See in Dollars";
      document.getElementById("cancellation" + id).innerHTML = "Cancellation Policy"

      // console.log(room.numberOfRooms-roomBooked[room.name])

      const checkbox = document.getElementById("checkBox" + id);
      const priceElement = document.getElementById("price" + id);

      single = getRooms.data.data.newSearch.singleCount
      double = getRooms.data.data.newSearch.doubleCount
      triple = getRooms.data.data.newSearch.tripleCount
      const appChild = getRooms.data.data.newSearch.appChild
      const minorChild = getRooms.data.data.newSearch.minorChild

      var date1 = new Date(getRooms.data.data.newSearch.checkinDate)
      var date2 = new Date(getRooms.data.data.newSearch.checkoutDate)
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      // Calculate the number of days
      var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (!mainObj.hasOwnProperty(room.name)) {
        var totalPrice = (single * room.singlePrice + double * room.doublePrice + triple * room.triplePrice + room.childRate * appChild + room.childRate * minorChild) * daysDiff;
        var rate = (room.taxRate / 100) * totalPrice
        var Nu = rate + totalPrice
        priceElement.innerHTML = `Nu. ${Nu.toLocaleString("en-US")}`;
        checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
            const convertedPrice = Nu / usdRate;
            priceElement.innerText = `$ ${convertedPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
          } else {
            const convertedPrice = Nu;
            priceElement.innerText = `Nu. ${convertedPrice.toLocaleString(
              "en-US"
            )}`;
          }
        });
      } else {

        var totalPrice = ((single * room.singlePrice) * (daysDiff - (mainObj[room.name].singleDays ? mainObj[room.name].singleDays : 0))) +
          ((double * room.doublePrice) * (daysDiff - (mainObj[room.name].doubleDays ? mainObj[room.name].doubleDays : 0))) +
          ((triple * room.triplePrice) * (daysDiff - (mainObj[room.name].doubleDays ? mainObj[room.name].doubleDays : 0))) +
          room.childRate * appChild + room.childRate * minorChild +
          (mainObj[room.name].singlePrice ? mainObj[room.name].singlePrice : 0) +
          (mainObj[room.name].doublePrice ? mainObj[room.name].doublePrice : 0) +
          (mainObj[room.name].triplePrice ? mainObj[room.name].triplePrice : 0);

        var rate = (room.taxRate / 100) * totalPrice

        var Nu = totalPrice + rate

        priceElement.innerHTML = `Nu. ${Nu.toLocaleString("en-US")}`;
        checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
            const convertedPrice = Nu / usdRate;
            priceElement.innerText = `$ ${convertedPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
          } else {
            const convertedPrice = Nu;
            priceElement.innerText = `Nu. ${convertedPrice.toLocaleString(
              "en-US"
            )}`;
          }
        });
      }


    });
    const cards = document.querySelectorAll(".room-container");

    for (let card of cards) {
      card.addEventListener("click", cardPressed);
    }

  } catch (error) {
    // Handle any errors that occurred during the request
    console.log(error);
  }
}
window.onload = fetchData;

var card_id = "";

const cardPressed = async (e) => {
  card_id = e.currentTarget.id;
  const price = document.getElementById("price" + card_id).textContent;
  try {
    const response = await axios.get(
      "https://ledger-trips.onrender.com/api/roomtypes/" + card_id
    );
    const Room = response.data.data;

    sessionStorage.setItem('data', JSON.stringify(price));

    if (Room.name === "Deluxe Room") {
      if (Room.numberOfRooms - roomBooked[Room.name] <= 0) {
        alert("No available rooms!")
      } else if (single + double + triple > (Room.numberOfRooms - roomBooked[Room.name])) {
        alert("The number of available rooms is less than required!")
      } else {
        location.assign('/deluxeRoom');
      }
    } else if (Room.name === "The Comfy Suite") {
      if (Room.numberOfRooms - roomBooked[Room.name] <= 0) {
        alert("No available rooms!")
      } else if (single + double + triple > (Room.numberOfRooms - roomBooked[Room.name])) {
        alert("The number of available rooms is less than required!")
      } else {
        location.assign('/comfortSuite');
      }
    } else if (Room.name === "Valley Suite") {
      if (Room.numberOfRooms - roomBooked[Room.name] <= 0) {
        alert("No available rooms!")
      } else if (single + double + triple > (Room.numberOfRooms - roomBooked[Room.name])) {
        alert("The number of available rooms is less than required!")
      } else {
        location.assign('/valleySuite');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function ignoreRedirect(event) {
  event.stopPropagation();
}
