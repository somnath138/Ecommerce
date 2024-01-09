const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//register a user

exports.registerUser=catchAsyncErrors(async(req,res)=>{
    const {name,email,password}=req.body //first extract from req.body
    
    const user=await User.create({ //then create a post request
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl"
        }
    })
   
    sendToken(user,201,res)
})

//Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    //checking if user has given password and email both
    //this is for if any one not enter email or password
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
      }
    //if find email and also password
    //if find user
    const user=await User.findOne({email}).select("+password");
    //select("+password") eivabe password ta nicchi karon amara age model ee password ta false kore rekhechilam taii
    //jodi user na paii then
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    //idPassword matched korlo ki na seta check korbe
    //401 status code mean unotharized user
    const isPasswordMatched=user.comparePassword(password);
    //then go to compare      
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    sendToken(user,200,res)
})

//Logout USer

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, { //cookie er tokeen er value null kore dao
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
