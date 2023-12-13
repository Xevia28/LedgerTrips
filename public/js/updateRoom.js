const id = JSON.parse(sessionStorage.getItem("id"));

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
async function getRoom() {
  getAdmin()
  const getRoom = await axios({
    method: "GET",
    url: "https://ledger-trips.onrender.com/api/roomtypes/" + id,
  });

  const room = getRoom.data.data;

  document.getElementById("name").value = room.name;
  document.getElementById("description").value = room.description;
  document.getElementById("photo").src = room.photo;
  document.getElementById("childRate").value = room.childRate;
  document.getElementById("taxRate").value = room.taxRate;
  document.getElementById("singlePrice").value = room.singlePrice;
  document.getElementById("doublePrice").value = room.doublePrice;
  document.getElementById("triplePrice").value = room.triplePrice;
  document.getElementById("numRooms").value = room.numberOfRooms;
}

window.onload = getRoom;

const update = async (data) => {
  // console.log(data)
  try {
    const res = await axios({
      method: "PATCH",
      url: "https://ledger-trips.onrender.com/api/roomtypes/" + id,
      data: data,
    });
    if (res.data.status === "success") {

      Swal.fire(
        '',
        'Room Updated Successfully!',
        'success'
      );

      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

document.getElementById("updateBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const photo = document.getElementById("photo").files[0];
  const singlePrice = document.getElementById("singlePrice").value;
  const doublePrice = document.getElementById("doublePrice").value;
  const triplePrice = document.getElementById("triplePrice").value;
  const numberOfRooms = document.getElementById("numRooms").value;
  const childRate = document.getElementById("childRate").value;
  const taxRate = document.getElementById("taxRate").value;
  const description = document.getElementById("description").value;

  console.log(name);

  if (
    name == "" ||
    photo == "" ||
    singlePrice == "" ||
    doublePrice == "" ||
    triplePrice == "" ||
    numberOfRooms == "" ||
    childRate == "" ||
    taxRate == "" ||
    description == ""
  ) {
    alert("All fields are required!");
  } else {
    const form = new FormData();
    if (photo) {
      form.append("name", name);
      form.append("photo", photo);
      form.append("singlePrice", singlePrice);
      form.append("doublePrice", doublePrice);
      form.append("triplePrice", triplePrice);
      form.append("numberOfRooms", numberOfRooms);
      form.append("childRate", childRate);
      form.append("taxRate", taxRate);
      form.append("description", description);
    } else {
      form.append("name", name);
      form.append("singlePrice", singlePrice);
      form.append("doublePrice", doublePrice);
      form.append("triplePrice", triplePrice);
      form.append("numberOfRooms", numberOfRooms);
      form.append("childRate", childRate);
      form.append("taxRate", taxRate);
      form.append("description", description);
    }

    update(form, "data");
  }
});

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://ledger-trips.onrender.com/api/admin/logout',
    })
    if (res.data.status === 'success') {
      location.assign('/api/admin/login')
    }
  } catch (err) {
    alert('Error Logging Out! Please Try Again.')
  }
}

var doc = document.querySelector('.logout-btn')

doc.addEventListener('click', (e) => logout())  
