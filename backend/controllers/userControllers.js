   const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //thows an erroe when user tries to login while not filling all the information
  if (!name ||!email||!password) {
    res.status(400);
    throw new Error("Plase Enter all the Feilds");
  }

  //findOne is a mongoDB query used to find whether the email exists in the data base or not
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Plase Enter all the Feilds");
  }

  //User.create is also an mongo db command that is used to insert or store the data the structure defined below
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a user , try again later");
  }
});

const authUser= asyncHandler(async(req,res)=>{

   const{email,password}=req.body;

   const user= await User.findOne({email});

   if(user&&(await user.matchPassword(password)))
   {
      res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      });
   
   }
   else{
      res.status(401);
      throw new Error("Invalid Email or Password");

   }

})




module.exports = { registerUser,authUser};