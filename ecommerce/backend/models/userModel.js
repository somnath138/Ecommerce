const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,//always enter unique email
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,//eta false kora mane jokhon find korbo tokhon eta chere baki sob details pabo without this
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",//always show usesr
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });

  userSchema.pre("save",async function(next){
    if(!this.isModified("password")){//jodi tumi password modified na kore thakko then next because hashed password again hashed not possible
        next()
    }
    //if  password not change execute this line
    this.password=await bcrypt.hash(this.password,10)//convert password into the hash password
  })
//JWT TOKEN
  userSchema.methods.getJWTToken=function(){//create a function whose name is getJWTToken
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    }) //this._id mean give user id access through this keyword
  }

  //compare password
  userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
  };
  module.exports=mongoose.model("user",userSchema)