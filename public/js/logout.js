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