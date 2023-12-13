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
window.onload = getAdmin;