async function getAdmin() {
    const getadmins = await axios({
      method: "GET",
      url: "http://localhost:4001/api/admin/"
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

async function fetchRooms(){
    try{
        getAdmin()
        const getRooms = await axios({
            method: "GET",
            url: "http://localhost:4001/api/roomtypes",
        });

        const rooms=getRooms.data.data.roomType

        rooms.forEach(room => {
            var roomCard = 
            `<div id=${room._id} class="row room-card mt-5">`+
            '<div class="col-lg-4">'+
            `<img src="${room.photo}" class="admin-room-image"/>`+
            '</div>'+
            '<div class="col-lg-8 room-card-contents">'+
            `<h4>${room.name}</h4>`+
            `<div>${room.description}</div>`+
            '<div class="hr-line"></div>'+
            '<div>'+
            '<div class="row">'+
            '<div class="row col-lg-4">'+
            '<div class="room-attribute col-lg-3">Price:</div>'+
            `<div class="room-value col-lg-7">${room.singlePrice}</div>`+
            '</div>'+
            '<div class="row col-lg-4">'+
            '<div class="room-attribute col-lg-5">Child Rate:</div>'+
            `<div class="room-value col-lg-7">NU. ${room.childRate}</div>`+
            '</div>'+
            '</div>'+
            '<div class="row mt-3">'+
            '<div class="row col-lg-4">'+
            '<div class="room-attribute col-lg-7">Number of Rooms:</div>'+
            `<div class="room-value col-lg-4">${room.numberOfRooms}</div>`+
            '</div>'+
            '<div class="row col-lg-4">'+
            '<div class="room-attribute col-lg-4">Tax Fee:</div>'+
            `<div class="room-value col-lg-4">${room.taxRate}</div>`+
            '</div>'+
            '</div>'+
            '</div>'+
            `<div id=${room._id} class="editBtn">`+
            '<a href="#" class="room-edit-btn">'+
            '<iconify-icon icon="bx:edit" width="26" class="room-edit-icon"></iconify-icon>'+
            'Edit'+
            '</a>'+
            '</div>'+
            '</div>'+
            '</div>'

            $(".allRooms").append(
                roomCard
            );

            const buttons = document.querySelectorAll(".editBtn");

            for (let button of buttons) {
                button.addEventListener("click", buttonPressed);
            }
        });

    }catch(err){
        console.log(err)
    }
}

window.onload = fetchRooms

const buttonPressed = async (e) => {
    const id = e.currentTarget.id
    sessionStorage.setItem('id', JSON.stringify(id));
    location.assign('/api/adminroom/update')
}

document.getElementById("addBtn").addEventListener('click', function() {
    // Redirect to another page
    location.assign('/api/adminroom/rooms')
});

const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4001/api/admin/logout',
        })
        if(res.data.status === 'success') {
            location.reload(true)
        }
    }catch(err){
        alert('Error Logging Out! Please Try Again.')
    }
}

var doc = document.querySelector('.logout-btn')

doc.addEventListener('click', (e) => logout())  