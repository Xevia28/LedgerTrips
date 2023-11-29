const RoomType = require("./../models/roomTypeModel");
const multer = require('multer')
let newSearch = {};

exports.getAllRoomTypes = async (req, res, next) => {
  try {
    const roomType = await RoomType.find();
    res.status(200).json({ data: {roomType,newSearch}, status: "success" });

    // res.render('./room/rooms.ejs', {newSearch, room});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.Homepage = async (req, res, next) => {
  try {
    res.render("./search/search.ejs");
  } catch (error) {
    console.log(error);
  }
};

exports.RoomPage = async (req, res, next) => {
  try {
    res.render("./room/rooms.ejs", { newSearch });
  } catch (error) {
    console.log(error);
  }
};

exports.RoomDetailPage = async (req, res, next) => {
  try {
    res.render("./room/roomDeluxe.ejs", {newSearch});
  } catch (error) {
    console.log(error);
  }
};

exports.RoomPema = async (req, res, next) => {
  try {
    res.render("./room/roomPema.ejs", {newSearch});
  } catch (error) {
    console.log(error);
  }
};

exports.RoomValley = async (req, res, next) => {
  try {
    res.render("./room/roomValley.ejs", {newSearch});
  } catch (error) {
    console.log(error);
  }
};


exports.NewSearch = async (req, res, next) => {
  const checkinDate = req.body.checkinDate;
  const checkoutDate = req.body.checkoutDate;
  const fValue = req.body.fValue;
  const deluxeShow = req.body.deluxeShow
  const fadultsCount = req.body.fadultsCount
  const minorChild = req.body.minorChild
  const appChild = req.body.appChild
  const singleCount = req.body.singleCount
  const doubleCount = req.body.doubleCount
  const tripleCount = req.body.tripleCount
  const roomBooked = req.body.roomBooked

  try {
    newSearch = {
      checkinDate,
      checkoutDate,
      fValue,
      deluxeShow,
      fadultsCount,
      minorChild,
      appChild,
      singleCount,
      doubleCount,
      tripleCount,
      roomBooked
    };
    res.render("./room/rooms.ejs", { newSearch });
  } catch (err) {
    next(err);
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("-"); //replacing the filename with the spaces and putting -
    const ext = file.mimetype.split("/")[1];
    cb(null, `${fileName}-${Date.now()}.${ext}`); // date of creation of the file
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadRoomPhoto = upload.single("photo");
// exports.uploadRoomPhotos = upload.array("photos", 5);

exports.createRoomType = async (req, res) => {
    try {
        const files = req.file;
        if (!files) {
          return res
            .status(400)
            .json({ status: "Invalid", message: "No Image in the request" });
        }
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/public/images/`;
        req.body.photo = `${basePath}${fileName}`

        const room = await RoomType.create(req.body);
        res.status(201).json({
          status: "success",
          data: {
            room
          },
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.getRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    res.json({ data: roomType, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoomType = async (req, res) => {
  try {
    const files = req.file;
      if (files) {
        console.log("file here")
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/public/images/`;
        req.body.photo = `${basePath}${fileName}`
      }
    const roomType = await RoomType.findByIdAndUpdate(req.params.id, req.body);
    res.json({ data: roomType, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findByIdAndDelete(req.params.id);
    res.json({ data: roomType, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
