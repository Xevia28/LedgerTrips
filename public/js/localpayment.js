var spanElement = document.querySelector('h3.amount span');
const bData = JSON.parse(sessionStorage.getItem("bookingData"));
console.log(bData)
const currencySymbol = bData.totalAmount.match(/[^\d.,]+/)[0];
var XRPLVALUE = 0;

if (currencySymbol === "Nu") {
    const amounts = parseFloat(bData.totalAmount.replace(/[^\d]/g, ''));
    spanElement.textContent = `${(amounts * 0.019).toFixed(4)} XRP`;
    XRPLVALUE = parseFloat((amounts * 0.019).toFixed(4));

} else {
    const amounts = parseFloat(bData.totalAmount.replace(/[^\d]/g, ''));
    spanElement.textContent = `${(amounts * 1.60).toFixed(4)} XRP`;
    XRPLVALUE = parseFloat((amounts * 1.60).toFixed(4));

}
console.log(XRPLVALUE)

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

document.getElementById("btn").addEventListener("click", async (e) => {
    e.preventDefault();
    sendTransaction()
})

async function sendTransaction() {
    loader.classList.remove("hide")

    const receiverAdd = await axios({
        method: "get",
        url: "https://ledger-trips.onrender.com/api/admin",
    });
    const receiverAddress = receiverAdd.data.data[0].xrplAccount;
    const seed = document.querySelector("#userseed").value
    if (seed === " " || seed === "") {
        loader.classList.add("hide")

        Swal.fire(
            '',
            'Seed cannot be empty ',
            'error'
        );
    } else {
        sendXRP(seed, XRPLVALUE, receiverAddress);
    }
}

async function bookNow(data) {
    const book = await axios({
        method: "POST",
        url: "https://ledger-trips.onrender.com/api/bookings",
        data: data
    });
    loader.classList.add("hide")
    if (book.data.status === "success") {
        Swal.fire(
            '',
            'Booking Successful',
            'success'
        ).then(function () {
            setTimeout(function () {
                location.assign("/");
            }, 100);
        });
    }
}

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
            loader.classList.add("hide")

            Swal.fire(
                '',
                'Invalid Seed',
                'error'
            );
            return;
        }
        const prepared = await client.autofill({
            "TransactionType": "Payment",
            "Account": wallet.address,
            "Amount": xrpl.xrpToDrops(amount),
            "Destination": destination
        });
        const signed = wallet.sign(prepared);
        const tx = await client.submitAndWait(signed.tx_blob).catch((err) => {
            console.error("Transaction submission error:", err);
            loader.classList.add("hide")

            Swal.fire(
                '',
                'Error: ' + err.message,
                'error'
            );
        });
        console.log(tx)

        const transactionID = tx.result.hash;
        const ledger_index = tx.result.ledger_index;
        const hash = tx.result.hash;
        const receiver = tx.result.Destination;
        const sender = tx.result.Account;
        const result = tx.result.meta.TransactionResult;
        const num = xrpl.dropsToXrp(tx.result.meta.delivered_amount)
        const amountsent = `${num} XRP`
        const date = new Date(tx.result.date * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        console.log(transactionID, ledger_index, hash, receiver, sender, result, formattedDate, amountsent);

        const datas = {
            hash: hash,
            ledger_index: ledger_index,
            date: formattedDate,
            type: "Payment",
            result: result,
            sender: sender,
            receiver: receiver,
            amount: amountsent,
            transactionID: transactionID,
        };

        const transaction = await axios({
            method: "POST",
            url: "https://ledger-trips.onrender.com/api/xrpltransaction",
            data: datas
        });

        console.log(transaction)

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
            await bookNow(data);
        } else {
            loader.classList.add("hide")

            Swal.fire(
                '',
                'Insufficient Balance',
                'error'
            );
        }
    } catch (error) {
        console.error(error);
        loader.classList.add("hide")

        Swal.fire(
            '',
            'Error: ' + error.message,
            'error'
        );
    } finally {
        await client.disconnect();
    }
}
