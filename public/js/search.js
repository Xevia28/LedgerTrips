let deluxeShow = false;
let fadultsCount = 1;
let fchildrenCount = 0;
let froomCount = 1;
let mostRoomCount = [];
let adultCount = [];

let minorChild = 0;
let appChild = 0;
let childAge = [];
let fChildAge = [];
let childPresent = [];
let fchildPresent = [];

let singleCount = 0;
let doubleCount = 0;
let tripleCount = 0;

let roomBooked = {};

$(document).ready(function () {
  // Increment and Decrement Adults in Room 1
  $("#incrementAdults").click(function () {
    var adultsCount = parseInt($("#adultsCount").text());
    if (adultsCount < 3) {
      adultsCount++;
      fadultsCount++;
      $("#adultsCount").text(adultsCount);
    }
  });

  $("#decrementAdults").click(function () {
    var adultsCount = parseInt($("#adultsCount").text());
    if (adultsCount > 1) {
      adultsCount--;
      fadultsCount--;
      $("#adultsCount").text(adultsCount);
    }
  });

  // Function to show/hide the age component(room1)
  function toggleAgeComponent() {
    var childrenCount = parseInt($("#childrenCount").text());

    if (childrenCount > 0) {
      $("#age").removeClass("hidden");
    } else {
      $("#age").addClass("hidden");
    }
  }

  // Function to show/hide the age component(dynamically added room)
  function toggleAgeComponentDynamic(room) {
    var childrenCount = parseInt(room.find(".childrenCount").text());

    if (childrenCount > 0) {
      room.find("#age").removeClass("hidden");
      // room.find('#agePad').addClass("ageP");

    } else {
      room.find("#age").addClass("hidden");
      // room.find('#agePad').removeClass("ageP");
      // room.find("#agePad .ageP").css("padding-right", "0 !important");
    }
  }


  $("#incrementChildren").click(function () {
    var childrenCount = parseInt($("#childrenCount").text());
    if (childrenCount < 1) {
      childrenCount++;
      fchildrenCount++;
      $("#childrenCount").text(childrenCount);
    }

    toggleAgeComponent();
  });

  // Decrement children count
  $("#decrementChildren").click(function () {
    var childrenCount = parseInt($("#childrenCount").text());
    if (childrenCount > 0) {
      childrenCount--;
      fchildrenCount--;
      $("#childrenCount").text(childrenCount);
    }

    toggleAgeComponent();
  });

  // Add Another Room
  var roomCounter = 1;
  function addRoom() {
    var roomHtml =
      '<div class="form-row">' +
      '<p for="rooms" class="rooms">Room ' +
      (roomCounter + 1) +
      ":</p>" +
      "</div>" +
      '<div class="form-row">' +
      '<div class="form-group input-fields mr-3 optionsWrapper">' +
      '<label for="adults" class="incrementOptions">Adults:</label>' +
      '<div class="input-group">' +
      '<button class="btn decrementAdults incrementDecrement add" type="button">-</button>' +
      '<div id="adultsCount" class="form-control adultsCount">1</div>' +
      '<button class="btn incrementAdults incrementDecrement minus" type="button">+</button>' +
      "</div>" +
      "</div>" +
      '<div class="form-group input-fields mr-3 optionsWrapper">' +
      '<label for="children" class="incrementOptions">Child (0-12 years):</label>' +
      '<div class="input-group ageP" id="agePad">' +
      '<button class="btn decrementChildren incrementDecrement add" type="button">-</button>' +
      '<div id="childrenCount" class="form-control childrenCount">0</div>' +
      '<button class="btn incrementChildren incrementDecrement minus" type="button">+</button>' +
      "</div>" +
      "</div>" +
      '<div class="form-group input-fields mr-3 hidden" id="age">' +
      '<label for="age" class="incrementOptions">Age:</label>' +
      '<div class="input-group">' +
      '<div class="dropdown">' +
      '<button id="ageDropdown" class="btn btn-outline-primary dropdown-toggle ageDropdown incrementDecrement age" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
      "0" +
      "</button>" +
      '<div class="dropdown-menu" aria-labelledby="ageDropdown">' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">0</a>' +
      '<a id="ageValue" class="dropdown-item age-option decrementAge" href="#">1</a>' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">2</a>' +
      '<a id="ageValue" class="dropdown-item age-option decrementAge" href="#">3</a>' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">4</a>' +
      '<a id="ageValue" class="dropdown-item age-option decrementAge" href="#">5</a>' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">6</a>' +
      '<a id="ageValue" class="dropdown-item age-option decrementAge" href="#">7</a>' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">8</a>' +
      '<a id="ageValue" class="dropdown-item age-option decrementAge" href="#">9</a>' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">10</a>' +
      '<a id="ageValue" class="dropdown-item age-option decrementAge" href="#">11</a>' +
      '<a id="ageValue" class="dropdown-item age-option incrementAge" href="#">12</a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="removeRoomBtnContainer" id="withAge">' +
      '<div class = "searchRemovePadding"><p>Hide</p></div>' +
      '<span class="iconify removeRoomIcon" data-icon="mdi:close-circle-outline" data-inline="false"></span>' +
      "</div>";

    $(".roomsMain").append(
      '<div class="room" style="opacity: 0; display: none;">' +
      roomHtml +
      "</div>"
    );
    roomCounter++;
    froomCount++;

    // Update room numbers
    $(".room").each(function (index) {
      $(this)
        .find("p[for='rooms']")
        .text("Room " + (index + 2) + ":");
    });

    // Animate room fade-in
    $(".room:last-child").slideDown(300, function () {
      $(this).css("opacity", "1").show();
    });

    // Reset children count and age component visibility
    $(".room:last-child .childrenCount").text("0");
    $(".room:last-child #age").addClass("hidden");

    fadultsCount++;

    adultCount = document.querySelectorAll("#adultsCount");
    childPresent = document.querySelectorAll("#childrenCount");
    childAge = document.querySelectorAll("#ageDropdown");
  }

  $("#addRoomButton").click(function () {
    addRoom();
  });

  // Increment and Decrement in Dynamically Added Room
  $(".roomsMain").on("click", ".incrementAdults", function () {
    var adultsCount = parseInt($(this).siblings(".adultsCount").text());
    if (adultsCount < 3) {
      adultsCount++;
      fadultsCount++;
      $(this).siblings(".adultsCount").text(adultsCount);
    }
  });

  $(".roomsMain").on("click", ".decrementAdults", function () {
    var adultsCount = parseInt($(this).siblings(".adultsCount").text());
    if (adultsCount > 1) {
      adultsCount--;
      fadultsCount--;
      $(this).siblings(".adultsCount").text(adultsCount);
    }
  });

  $(".roomsMain").on("click", ".incrementChildren", function () {
    var childrenCount = parseInt($(this).siblings(".childrenCount").text());
    if (childrenCount < 1) {
      childrenCount++;
      fchildrenCount++;
      $(this).siblings(".childrenCount").text(childrenCount);
      toggleAgeComponentDynamic($(this).closest(".room"));
    }
  });

  $(".roomsMain").on("click", ".decrementChildren", function () {
    var childrenCount = parseInt($(this).siblings(".childrenCount").text());
    if (childrenCount > 0) {
      childrenCount--;
      fchildrenCount--;
      $(this).siblings(".childrenCount").text(childrenCount);
      toggleAgeComponentDynamic($(this).closest(".room"));
    }
  });

  // Remove Dynamically Added Room
  $(".roomsMain").on("click", ".removeRoomIcon", function () {
    var $room = $(this).closest(".room");
    $room.slideUp(300, function () {
      $room.remove();
      $(".room").each(function (index) {
        $(this)
          .find("p[for='rooms']")
          .text("Room " + (index + 2) + ":");
      });
    });
  });

  // age Dropdown
  $(".roomsMain").on("mousedown touchstart", ".ageDropdown", function () {
    $(this).siblings(".dropdown-menu").show();
  });

  $(".roomsMain").on("blur", ".ageDropdown", function () {
    var $dropdownMenu = $(this).siblings(".dropdown-menu");
    setTimeout(function () {
      $dropdownMenu.hide();
    }, 200);
  });

  $(".roomsMain").on("mousedown touchstart", ".age-option", function () {
    var selectedAge = $(this).text();
    var $ageDropdown = $(this).closest(".dropdown").find(".ageDropdown");
    $ageDropdown.text(selectedAge);
    $(this).closest(".dropdown-menu").hide();
  });

  $(".roomsMain").on("mousedown touchstart", ".decrementChildren", function () {
    var childrenCount = parseInt($(this).siblings(".childrenCount").text());
    if (childrenCount > 0) {
      childrenCount--;
      fchildrenCount--;
      $(this).siblings(".childrenCount").text(childrenCount);
    }

    if (childrenCount === 0) {
      $(this).siblings(".ageDropdown").parent().addClass("hidden");
    }
  });
});

adultCount = document.querySelectorAll("#adultsCount");
childPresent = document.querySelectorAll("#childrenCount");
childAge = document.querySelectorAll("#ageDropdown");

let fValue = "";

function checkDate() {
  var selectedDate = document.getElementById("checkIn").value;
  var today = new Date().toISOString().split("T")[0];

  if (selectedDate < today) {
    Swal.fire(
      '',
      'Selected date is before today.',
      'error'
    );
    document.getElementById("checkIn").value = "";
  }
}

function checkOutDate() {
  var checkinDate = document.getElementById("checkIn").value;
  var checkoutDate = document.getElementById("checkOut").value;

  // Compare the selected date with today's date
  if (checkoutDate < checkinDate) {
    Swal.fire(
      '',
      'Check Out Date cannot be before Check In Date!',
      'error'
    );
    document.getElementById("checkOut").value = "";
  }
}

// roomBooked = {};

const getRooms = async () => {
  try {
    const response = await axios.get("https://ledger-trips.onrender.com/api/roomtypes");
    const rooms = response.data.data.roomType;
    rooms.forEach((room) => {
      if (!roomBooked.hasOwnProperty(room.name)) {
        // If it doesn't exist, add it as a key with an initial value of 0
        roomBooked[room.name] = 0;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

getRooms();

const getBookings = (checkinDate, checkoutDate) => {
  return axios
    .get("https://ledger-trips.onrender.com/api/bookings")
    .then((response) => {
      const bookings = response.data.data;
      bookings.forEach((booking) => {
        if (
          checkinDate < booking.checkoutDate &&
          checkoutDate > booking.checkinDate
        ) {
          roomBooked[booking.roomType] += parseInt(booking.totalRooms);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

let customRoom = {}
const getCustomBookings = (checkinDate, checkoutDate) => {
  return axios
    .get("https://ledger-trips.onrender.com/api/customBooking")
    .then((response) => {
      const bookings = response.data.data;
      bookings.forEach((booking) => {
        if (checkinDate < booking.endDate && checkoutDate > booking.startDate) {
          if (customRoom.hasOwnProperty(booking.roomType)) {
            if (customRoom[booking.roomType] < booking.rooms) {
              customRoom[booking.roomType] = booking.rooms;
            }
          } else {
            customRoom[booking.roomType] = booking.rooms;
          }
        }
      });
      for (const i in roomBooked) {
        for (const j in customRoom) {
          if (i == j) {
            roomBooked[i] += customRoom[j]
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const finalCheck = async (checkinDate, checkoutDate, fValue) => {
  singleCount = 0;
  doubleCount = 0;
  tripleCount = 0;
  minorChild = 0;
  appChild = 0;
  mostRoomCount = [];
  var deluxeCheck = 0;
  for (let element of adultCount) {
    const value = element.textContent;
    mostRoomCount.push(value);
  }
  mostRoomCount.forEach((roomCount) => {
    if (roomCount == 3) {
      tripleCount++;
      deluxeCheck++;
    } else if (roomCount == 2) {
      doubleCount++;
    } else {
      singleCount++;
    }
  });

  if (deluxeCheck == 0) {
    deluxeShow = true;
  } else {
    deluxeShow = false;
  }

  fChildAge = [];
  fchildPresent = [];

  for (let age of childAge) {
    const value = age.textContent.trim();
    fChildAge.push(value);
  }

  for (let child of childPresent) {
    const value = child.textContent.trim();
    fchildPresent.push(value);
  }

  var len = fChildAge.length;
  for (var i = 0; i < len; i++) {
    if (fchildPresent[i] != 0) {
      if (fChildAge[i] <= 6) {
        minorChild++;
      } else if (fChildAge[i] > 6) {
        appChild++;
      }
    }
  }

  try {
    const res = await axios({
      method: "POST",
      url: "https://ledger-trips.onrender.com/checkSearch",
      data: {
        checkinDate,
        checkoutDate,
        fValue,
        deluxeShow,
        fadultsCount,
        minorChild,
        appChild,
        singleCount,
        doubleCount,
        tripleCount,
        roomBooked,
      },
    });
    location.assign("/roomtypes");
  } catch (err) {
    alert(err);
  }
};

document.getElementById("searchBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const checkinDate = document.getElementById("checkIn").value;
  const checkoutDate = document.getElementById("checkOut").value;

  if (checkinDate == "" || checkoutDate == "") {
    Swal.fire(
      '',
      'All fields are required!',
      'error'
    );
  } else if (checkinDate > checkoutDate) {
    Swal.fire(
      '',
      'Check in date should be before checkout date!',
      'error'
    );

  } else {
    fValue = `${fadultsCount} Adults, ${fchildrenCount} Children, ${froomCount} Rooms`;
    try {
      await getBookings(checkinDate, checkoutDate);
      await getCustomBookings(checkinDate, checkoutDate);
      finalCheck(checkinDate, checkoutDate, fValue);
    } catch (err) {
      console.log(err);
    }
  }
});
