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

window.onload = getAdmin;

const addRoom = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4001/api/roomtypes",
        data: data,
      });
      if (res.data.status === "success") {
        alert("Room Added Successfully!!");
      }
    } catch (err) {
      console.log(err)
    }
};

document.getElementById("addBtn").addEventListener("click", (e) => {
    e.preventDefault();

    const name=document.getElementById("name").value
    const photo=document.getElementById("photo").files[0]
    const singlePrice=document.getElementById("singlePrice").value
    const doublePrice=document.getElementById("doublePrice").value
    const triplePrice = document.getElementById("triplePrice").value
    const numberOfRooms=document.getElementById("numRooms").value
    const childRate = document.getElementById("childRate").value
    const taxRate = document.getElementById("taxRate").value
    const description = document.getElementById("description").value

    if (name == "" || photo == "" || singlePrice == "" || doublePrice == "" || triplePrice == "" 
    || numberOfRooms == "" || childRate == "" || taxRate == "" || description == ""){
        alert("All fields are required!")
    }else{
        const form = new FormData()
        form.append("name", name)
        form.append("photo", photo)
        form.append("singlePrice", singlePrice)
        form.append("doublePrice", doublePrice)
        form.append("triplePrice", triplePrice)
        form.append("numberOfRooms", numberOfRooms)
        form.append("childRate", childRate)
        form.append("taxRate", taxRate)
        form.append("description", description)

        addRoom(form, 'data');
    }
})

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