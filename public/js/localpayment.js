const receiverAddress = "rLBG48rc8djjJV15Yn7Rssp8PHbCTsY9pe";
const secretKey = "sEdVQ4htrwdfVywGXcHSmdNck5bCgSh";

async function sendTransaction() {
    const amount = parseFloat(bData.totalAmount.replace(/[^\d.-]/g, ''));
    const exchangeRate = 0.75;

    const xrplvalue = amount * exchangeRate
    // Call the function with appropriate arguments
    sendXRP("sEdSvTY3uM4YPJGfDEmdz64kTNBvgCQ", xrplvalue, receiverAddress);
}

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
console.log(bData)
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

// const submitButton = document.getElementById("btn");
// document.getElementById("btn").addEventListener("click", async (e) => {
//     e.preventDefault();
//     loader.classList.remove("hide")
//     const transactionID = document.getElementById("journalNumber").value
//     if (transactionID == "") {
//         Swal.fire(
//             '',
//             'Journal Number required!',
//             'error'
//         )
//     } else {
//         const data = {
//             reservationID,
//             name,
//             email,
//             contactNumber,
//             specialRequirement,
//             roomType,
//             checkinDate,
//             checkoutDate,
//             adultNumber,
//             childMinorNumber,
//             childNumber,
//             totalRoomTypes,
//             totalRooms,
//             totalAmount,
//             transactionID
//         }
//         bookNow(data)
//     }
// })

document.getElementById("btn").addEventListener("click", async (e) => {
    e.preventDefault();
    sendTransaction()
})

async function sendXRP(seed, amount, destination) {
    const client = new xrpl.Client('wss://s.devnet.rippletest.net:51233/', { connectionTimeout: 10000 });

    try {
        await client.connect();
        let address = "";
        let wallet = "";
        try {
            wallet = xrpl.Wallet.fromSeed(seed);
            address = wallet.classicAddress;
        } catch (err) {
            console.error("Invalid Seed Value", err);
            return;
        }
        console.log(address)
        const prepared = await client.autofill({
            "TransactionType": "Payment",
            "Account": wallet.address,
            "Amount": xrpl.xrpToDrops(amount),
            "Destination": destination
        });
        const signed = wallet.sign(prepared);
        console.log(signed)
        const tx = await client.submitAndWait(signed.tx_blob).catch((err) => {
            console.error("Transaction submission error:", err);
        });

        const transactionID = tx.result.hash

        if (tx.result.meta.TransactionResult === "tesSUCCESS") {
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

    } catch (error) {
        console.error(error);
    } finally {
        await client.disconnect();
    }
}
