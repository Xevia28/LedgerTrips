let userToken;

if (document.cookie) {
    try {
        const decodedCookie = decodeURIComponent(document.cookie);
        const jsonStartIndex = decodedCookie.indexOf('{');
        const jsonString = decodedCookie.substring(jsonStartIndex);
        userToken = JSON.parse(jsonString);
        document.getElementById('adminName').innerHTML = userToken.name
    } catch (error) {
        console.error('Error parsing JSON:', error);
        userToken = {};
    }
} else {
    userToken = {};
}

console.log(userToken)

async function handleUserDetails() {
    try {
        const client = new xrpl.Client('wss://s.devnet.rippletest.net:51233/', { connectionTimeout: 10000, requestTimeout: 60000, });
        await client.connect();
        const walletBalance = await client.getXrpBalance(userToken.xrplAccount)
        document.getElementById("account_balance").innerHTML = `${walletBalance} Ripple`
        console.log(walletBalance)
    } catch (err) {
        console.log(err)
    }
}

handleUserDetails()
