const { trusted } = require("mongoose");
const Product=require("../models/productModel.js");
const ErrorHandler = require("../uitils/Errorhandler.js");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const Features = require("../uitils/Features.js");

//create product

const createProduct=catchAsyncError(async(req,res,next)=>{
    
    const product=await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}
);

const getAllproducts= catchAsyncError(async (req,res)=>{
    const feature=new Features(Product.find(),req.query).search()
    const product=await feature.query;
    res.status(200).json({
        sucess:true,
        product
    })
})

// update product--Admin product;
const updateProduct=async (req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));

    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true,
        useUnified:false,
    });
res.status(200).json({
    sucess:true,
    product
})
}

// delete product;
const deleteProduct=async (req,res,next)=>{
    const product=await Product.findByIdAndRemove(req.params.id);
    if(product){
        return res.status(200).json({
            sucess:true,
            message:"Product Delete Success",
            product:product
        })
    }else{
        return next(new ErrorHandler("Product not found",404));
    }
}

//single product
const singleProduct=async (req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        return res.status(200).json({
            sucess:true,
            message:"Your product",
            product:product
        })
    }else{
        return next(new ErrorHandler("Product not found",404));
    }

}


module.exports = {

    createProduct,
    getAllproducts,
    updateProduct,
    deleteProduct,
    singleProduct
}