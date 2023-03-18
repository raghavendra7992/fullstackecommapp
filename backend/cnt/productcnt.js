const { trusted } = require("mongoose");
const Product=require("../models/productModel.js")



//create product

const createProduct=async(req,res,next)=>{
    
    const product=await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}


const getAllproducts=async (req,res)=>{
    const product=await Product.find();
    res.status(200).json({
        sucess:true,
        product
    })
}

// update product;
const updateProduct=async (req,res)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })

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
const deleteProduct=async (req,res)=>{
    const product=await Product.findByIdAndRemove(req.params.id);
    if(product){
        return res.status(200).json({
            sucess:true,
            message:"Product Delete Success",
            product:product
        })
    }else{
        return res.status(404).json({
            sucess:false,
            message:"product not found with this id"
        })
    }
}

//single product
const singleProduct=async (req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        return res.status(200).json({
            sucess:true,
            message:"Your product",
            product:product
        })
    }else{
        return res.status(500).json({
            success:false,
            message:"Product not found",
        })
    }

}


module.exports = {
    createProduct,
    getAllproducts,
    updateProduct,
    deleteProduct,
    singleProduct
}