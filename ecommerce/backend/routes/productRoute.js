const express=require("express");
const { getAllProducts,createProduct,updateProducts,deleteProduct,productDetails} = require("../controllers/productController");
const { isAuthenticatedUser,authorizedRoles } = require("../middleware/auth");

const router=express.Router();

//function call through this
//authorizedRoles("admin"),
router.route("/products").get(isAuthenticatedUser, authorizedRoles("admin"),getAllProducts)//whichone is authenticated those one show

router.route("/product/new").post(isAuthenticatedUser,createProduct)

router.route("/product/:id").put(isAuthenticatedUser,updateProducts).delete(isAuthenticatedUser,deleteProduct).get(productDetails)//if user authorized then only give the access to delete and put the request

module.exports=router