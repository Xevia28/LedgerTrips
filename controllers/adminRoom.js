exports.AddRoom = async (req, res, next) => {
  try {
    res.render("./Dashboard/addRoom.ejs");
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateRoom = async (req, res, next) => {
  try {
    res.render("./Dashboard/updateRoom.ejs");
  } catch (error) {
    console.log(error);
  }
};

exports.AllRoom = async (req, res, next) => {
  try {
    res.render("./Dashboard/room.ejs");
  } catch (error) {
    console.log(error);
  }
};

exports.Booking = async (req, res, next) => {
  try {
    res.render("./Dashboard/adminBooking.ejs");
  } catch (error) {
    console.log(error);
  }
};
