const Product=require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create product --admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
    //request.body theke user request pathanor sathe sathe id tao pathay dibe
    req.body.user=req.user.id //it pass through the productMdel

    const product=await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })//eigulo show korbe agar status thik hoy tobe 

});


//get all products
exports.getAllProducts=catchAsyncErrors(async(req,res)=>{
    const resultPerpage=5;
    const productCount=await Product.countDocuments();
    console.log(productCount)
    const apiFeatures= new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
    const product=await apiFeatures.query;
    res.status(200).json({
        success:true,
        product,
        productCount
    })
});


//update products --admin
exports.updateProducts=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"product not found"
        // })
        return next(new ErrorHandler("product not found",404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    return res.status(200).json({
        success:true,
        product
    })
});



//delete product 
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"product not found"
        // })
        return next(new ErrorHandler("product not found",404))
    }

    await product.deleteOne()
    res.status(200).json({
        success:true,
        message:"product delete successfully"
    })
});


//GET PRODUCT DETAIL

exports.productDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"product not found"
        // })
        return next(new ErrorHandler("product not found",404))
    }
   
    res.status(200).json({
        success:true,
        product
    })
});
