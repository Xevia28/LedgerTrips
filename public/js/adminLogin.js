const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:4001/api/admin/signin',
            data: {
                email,
                password,
            },
        });

        if (res.data.status === 'success') {
            Swal.fire(
                '',
                'Login Successful',
                'success'
            );
            var obj = res.data.data.admin
            document.cookie = 'token=' + JSON.stringify(obj) + ';path=/';
            location.assign('/api/calendar');
        } else {
            // For non-successful login, show the error message from the server (if available)
            Swal.fire(
                '',
                res.data.message || 'Login Failed',
                'error'
            );
        }
    } catch (err) {
        // Handle errors, including failed login attempts (e.g., network error or server-side issue)
        Swal.fire(
            '',
            'Login Failed: Please try again later',
            'error'
        );
        console.log(err);
    }
};

document.querySelector('.btn').addEventListener("click", (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if (email == "" || password == "") {
        alert("All fields are required!")
    } else {
        login(email, password)
    }
})
