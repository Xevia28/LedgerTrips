let id = "";
let bookingCount = 0;
let roomCount = 0;
let totalRoomCounts = 0;

async function getAdmin() {
  const getadmins = await axios({
    method: "GET",
    url: "https://ledger-trips.onrender.com/api/admin/"
  })
  
  const alladmins = getadmins.data.data
  
  const admins = []
  alladmins.forEach(admin => {
    admins.push(admin)
  })
  admins.forEach(admin => {
    if(document.cookie.includes(admin._id)){
        document.getElementById('adminName').innerHTML = admin.name
    }
  })
}

async function fetchRooms() {
  try {
    const getRooms = await axios({
      method: "GET",
      url: "https://ledger-trips.onrender.com/api/roomtypes"
    })

    const rooms = getRooms.data.data.roomType
    console.log(rooms)
    rooms.forEach((room) => {
      roomCount++;
      totalRoomCounts += room.numberOfRooms
    })
    document.getElementById("bookingNum").innerHTML = bookingCount;
    document.getElementById("roomNum").innerHTML = roomCount;
    document.getElementById("totalRoom").innerHTML = totalRoomCounts;
  } catch (err) {
    console.log(err)
  }
}

// window.onload=fetchRooms;

async function fetchBookings() {
  try {
    const getBookings = await axios({
      method: "GET",
      url: "https://ledger-trips.onrender.com/api/bookings",
    });

    const bookings = getBookings.data.data;
    bookings.forEach((booking) => {
      if (booking.transactionVerification == true) {
        bookingCount++;
        var bookingCard =
          `<div id=${booking._id} class="col-6 booking-card" data-bs-toggle="modal" data-bs-target="#exampleModal">` +
          '<div class="card-booking">' +
          '<div class="card-body-booking">' +
          '<div class="reservation-number">' +
          "<p>" +
          '<strong class="bold-info pe-1">Reservation Number :</strong>' +
          '<strong class="mainInfo">' +
          `${booking.reservationID}` +
          "</strong>" +
          "</p>" +
          "</div>" +
          '<div class="booking-info">' +
          '<div class="ms-3">' +
          "<p>" +
          '<strong class="bold-info pe-1">Name :</strong>' +
          '<strong class="mainInfo">' +
          `${booking.name}` +
          "</strong>" +
          "</p>" +
          "<p>" +
          '<strong class="bold-info pe-1">Check in :</strong>' +
          '<strong class="mainInfo">' +
          `${new Date(booking.checkinDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}` +
          "</strong>" +
          "</p>" +
          "<p>" +
          '<strong class="bold-info pe-1">Room Type :</strong>' +
          '<strong class="mainInfo">' +
          `${booking.roomType}` +
          "</strong>" +
          "</p>" +
          "</div>" +
          "<div>" +
          '<p class="overflow-ellipsis">' +
          '<strong class="bold-info pe-1">Email :</strong>' +
          '<strong class="mainInfo">' +
          `${booking.email}` +
          "</strong>" +
          "</p>" +
          "<p>" +
          '<strong class="bold-info pe-1">Check out :</strong>' +
          '<strong class="mainInfo">' +
          `${new Date(booking.checkoutDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}` +
          "</strong>" +
          "</p>" +
          "<p>" +
          '<strong class="bold-info pe-1">Number of Rooms :</strong>' +
          '<strong class="mainInfo">' +
          `${booking.totalRooms}` +
          "</strong>";
        "</p>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>";

        $("#mainDiv").append(bookingCard);

        const cards = document.querySelectorAll(".booking-card");

        for (let card of cards) {
          card.addEventListener("click", cardPressed);
        }
      }
    });
    getAdmin()
    fetchRooms()
  } catch (error) {
    console.log(error);
  }
}

window.onload = fetchBookings;

const cardPressed = async (e) => {
  card_id = e.currentTarget.id;
  id = card_id;
  try {
    const response = await axios.get(
      "https://ledger-trips.onrender.com/api/bookings/" + card_id
    );
    const booking = response.data.data;
    document.getElementById("modalReservationID").innerHTML =
      booking.reservationID;
    document.getElementById("modalName").innerHTML = booking.name;
    document.getElementById("modalContact").innerHTML = booking.contactNumber;
    document.getElementById("modalEmail").innerHTML = booking.email;
    document.getElementById("modalRoomType").innerHTML = booking.roomType;
    document.getElementById("modalRoomTypeNum").innerHTML =
      booking.totalRoomTypes;
    document.getElementById("modalTotalRoom").innerHTML = booking.totalRooms;
    document.getElementById("modalTransactionID").innerHTML =
      booking.transactionID;
    document.getElementById("modalAdults").innerHTML = booking.adultNumber;
    document.getElementById("modalTotalAmount").innerHTML = booking.totalAmount;
    document.getElementById("modalMinor").innerHTML = booking.childMinorNumber;
    document.getElementById("modalChild").innerHTML = booking.childNumber;
    document.getElementById("modalCheckin").innerHTML = new Date(
      booking.checkinDate
    ).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    document.getElementById("modalCheckout").innerHTML = new Date(
      booking.checkoutDate
    ).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    console.log(error);
  }
};

function handleSearch() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var bookingCards = document.getElementsByClassName("booking-card");

  // Loop through each booking card
  for (var i = bookingCards.length; i < bookingCards.length-1; i--) {
    var card = bookingCards[i];
    var bookingInfo = card.querySelector(".booking-info");
    var reservationNumber = card.querySelector(".reservation-number");
    var cardDetails = bookingInfo.getElementsByTagName("p");
    var fullName = "";
    var reservationId = reservationNumber
      .querySelector(".mainInfo")
      .textContent.toLowerCase();
    var matchFound = false;

    // Concatenate all details in the card to form the full name
    for (var j = 0; j < cardDetails.length; j++) {
      fullName += cardDetails[j].textContent.toLowerCase();
    }
    var searchWords = input.split(" ");

    var allWordsMatch = searchWords.every(function (word) {
      return fullName.includes(word) || reservationId.includes(word);
    });

    if (allWordsMatch) {
      matchFound = true;
    }

    if (matchFound) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}

var deleteButton = document.querySelector(".deleteBtn");

// Function to show the confirmation dialog using SweetAlert2
const showConfirmationDialog = async () => {
  const result = await Swal.fire({
    title: 'Are you sure you want to delete this booking?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  });

  return result.isConfirmed; // Return true if the user clicks the "Yes, delete it!" button
};

// Add click event listener to the delete button
deleteButton.addEventListener("click", async (event) => {
  // Prevent the default behavior of the button
  event.preventDefault();

  // Show confirmation dialog
  const confirmation = await showConfirmationDialog();

  if (confirmation) {
    try {
      const deleteinfo = await axios({
        method: "DELETE",
        url: "https://ledger-trips.onrender.com/api/bookings/" + id,
      });

      Swal.fire(
        '',
        'Booking deleted Successfully!',
        'success'
      );

      location.reload();
    } catch (err) {
      console.log(err);
      Swal.fire(
        '',
        'Failed to delete booking!',
        'error'
      );
    }
  }
});


const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://ledger-trips.onrender.com/api/admin/logout',
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
