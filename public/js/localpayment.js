async function bookNow(data) {
    const book = await axios({
        method: "POST",
        url: "http://localhost:4001/api/bookings",
        data: data
    });
    loader.classList.add("hide")

    if (book.data.status === "success") {
        Swal.fire(
            '',
            'Transaction Successful',
            'success'
        ).then(function () {
            setTimeout(function () {
                location.assign("/");
            }, 100);
        });
       
    }

}

var spanElement = document.querySelector('h3.amount span');
const bData = JSON.parse(sessionStorage.getItem("bookingData"));

spanElement.textContent = bData.totalAmount;

const reservationID = bData.reservationID
const name = bData.name
const email = bData.email
const contactNumber = bData.contactNumber
const specialRequirement = bData.specialRequirement
const roomType = bData.roomType
const checkinDate = bData.checkinDate
const checkoutDate = bData.checkoutDate
const adultNumber = bData.adultNumber
const childMinorNumber = bData.childMinorNumber
const childNumber = bData.childNumber
const totalRoomTypes = bData.totalRoomTypes
const totalRooms = bData.totalRooms
const totalAmount = bData.totalAmount
const loader = document.getElementById("loading-screen")
const submitButton = document.getElementById("btn");
document.getElementById("btn").addEventListener("click", async (e) => {
    e.preventDefault();
    loader.classList.remove("hide")
    const transactionID = document.getElementById("journalNumber").value
    if (transactionID == "") {
        Swal.fire(
            '',
            'Journal Number required!',
            'error'
        )
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
            totalAmount,
            transactionID
        }
        bookNow(data)
    }
})