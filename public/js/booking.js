let search = {};
let roomType = "";
let countryCode = "";
let reservationIDs = [];


function initializeScript(newSearch) {
  search = JSON.parse(newSearch);
}

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function extractCountryCodeAndNumber() {
  const selectedCountryData = phoneInput.getSelectedCountryData();
  const selectedCountryCode = selectedCountryData.dialCode;

  // Perform any actions with the selected country code and phone number
  // Here's an example of displaying the selected country code and phone number in the console
  countryCode = selectedCountryCode
}

phoneInputField.addEventListener("countrychange", extractCountryCodeAndNumber);

window.onload = extractCountryCodeAndNumber

const getBookings = () => {
  return axios
    .get("https://ledger-trips.onrender.com/api/bookings")
    .then((response) => {
      const bookings = response.data.data;
      bookings.forEach((booking) => {
        reservationIDs.push(booking.reservationID)
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

async function generateCode() {
  await getBookings();
  const code = Math.floor(10000 + Math.random() * 90000);
  return "TPR" + code.toString();
}

function isCodeGenerated(code) {
  return reservationIDs.includes(code);
}

async function generateAndCheckCode() {
  let code = await generateCode();
  while (isCodeGenerated(code)) {
    code = await generateCode();
  }

  return code;
}

document.getElementById("bookBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const reservationID = await generateAndCheckCode();
  const totalAmount = JSON.parse(sessionStorage.getItem('data'));;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const contactNumber = `(${countryCode})${document.getElementById("phone").value}`;
  const phoneNumber = document.getElementById("phone").value
  const specialRequirement = document.getElementById("requirement").value;
  const room = document.querySelector("#roomName").textContent.trim();
  if (room == "DELUXE ROOM") {
    roomType = "Deluxe Room";
  } else if (room == "THE COMFY SUITE") {
    roomType = "The Comfy Suite";
  } else if (room == "THE VALLEY SUITE") {
    roomType = "The Valley Suite";
  }
  const checkinDate = search.checkinDate;
  const checkoutDate = search.checkoutDate;
  const adultNumber = search.fadultsCount;
  const childMinorNumber = search.minorChild;
  const childNumber = search.appChild;
  const totalRoomTypes = `${search.singleCount} Single, ${search.doubleCount} Double, ${search.tripleCount} Triple`;
  const totalRooms = search.singleCount + search.doubleCount + search.tripleCount

  if (name == "" || email == "" || contactNumber == "" || phoneNumber == "") {
    Swal.fire(
      '',
      'Please fill the required fields!',
      'error'
    );
  } else if (!isValidEmail(email)) {
    Swal.fire(
      '',
      'Please enter a valid email address!',
      'error'
    );
  } else {
    const data = {
      reservationID,
      name,
      email,
      contactNumber,
      specialRequirement,
      roomType,
      checkinDate,
      checkoutDate,
      adultNumber,
      childMinorNumber,
      childNumber,
      totalRoomTypes,
      totalRooms,
      totalAmount
    };
    sessionStorage.setItem('bookingData', JSON.stringify(data));
    location.assign('/api/bookings/payment')
  }
});


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function autoResizeTextarea() {
  const textarea = document.getElementById("requirement");
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

document.getElementById("requirement").addEventListener("input", autoResizeTextarea);
