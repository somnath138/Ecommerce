const ErrorHandler=require("../utils/errorhandler");
module.exports=(err,req,res,next)=>{

    //error created 
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server error"
    //for uncaught error like mongodb path deuyar somoy jodi id name limited theke choto diye dey tobe eii error occured hobe
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid ${err.path}`;
        err=new ErrorHandler(message,400)//ErrorHandler class ee pathay dibo error taaa
    }

    //show the status
    res.status(err.statusCode).json({
        success:false,
        err:err,
        message:err.message,
        error:err.stack
    })
}

//
// 1.cast error 
// mainly http://localhost:4000/api/v1/product/657e id kokhono eto choto hote pare na taii eta caste error

//2. UNCAUGHT error 
// mainly occured when we write undefined anything in the code like 
// console.log(youtueb) show error youtube not defined 
// this type of error handle through the uncaught error

//3.unhandled promise rejection
//  when you change mongodb url and write and wrong thing in the mongodb url then occurd this type of error
//"mongodb://localhost:27017/Ecommerce" if you write it like "mon://localhost:27017/Ecommerce" then using this error handle this kind of error