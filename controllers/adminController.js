const Admin = require('./../models/adminModel')
const jwt = require('jsonwebtoken')
const promisify = require('util').promisify;

exports.loginPage = async (req, res, next) => {
    try {
      res.render("./AdminLogin/Login.ejs");
    } catch (error) {
      console.log(error);
    }
};

exports.adminProfile = async (req, res, next) => {
    try {
      res.render("./Dashboard/adminProfile.ejs");
    } catch (error) {
      console.log(error);
    }
};




exports.getAllAdmins = async (req, res, next) => {
    try {
        const admin = await Admin.find()
        res.status(200).json({data: admin, status: 'success'});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getAdmin = async (req, res) => {
    try { 
        const admin = await Admin.findById(req.params.id);
        res.json({data: admin, status: 'success'});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.updateAdmin = async (req, res) => {
    try { 
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body);
        res.json({data: admin, status: 'success'});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteAdmin = async (req, res) => {
    try { 
        const admin = await Admin.findByIdAndDelete(req.params.id);
        res.json({data: admin, status: 'success'});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
}

const signToken =(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}
const createSendToken =(admin, statusCode, res)=> {
    const token = signToken(admin._id)
    const cookieOptions = {
        expires: new Date(
            Date.now()+process.env.JWT_COOKIE_EXPIRES_IN *24 *60 * 60*1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            admin
        }
    })
}
exports.signup = async (req, res, next) => {
    try{
        const newAdmin = await Admin.create(req.body)
        createSendToken(newAdmin, 201, res)
    }
    catch(err){
        res.status(500).json({error: err.message});
    } 
}

exports.login = async(req, res, next) => {
    try{
        const{email, password} = req.body
        if(!email||!password){
            return res.status(401).send('Please provide an email and password!')
        }
        const admin = await Admin.findOne({email}).select('+password')
        
        if(!admin || !await admin.correctPassword(password, admin.password)){
           return res.status(401).send("Incorrect Email or Password!")
        }
        createSendToken(admin, 200, res)
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({status: 'success'})
}

exports.logoutDirectly = (req, res) => {
    try {
      res.clearCookie("jwt");
      res.render("./AdminLogin/Login.ejs");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

exports.protect = async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }
  
      if (!token || token === "") {
        return res.redirect("/api/admin/login");
      }
  
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
      const freshUser = await Admin.findById(decoded.id);
      if (!freshUser) {
        return res.status(401).send("The user belonging to this token no longer exists");
      }
  
      req.admin = freshUser;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  