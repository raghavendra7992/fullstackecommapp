const Product=require("../models/productModel.js")



//create product

const createProduct=async(req,res,next)=>{
    
    const product=await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}


const getAllproducts=(req,res)=>{
    res.status(200).json({
        message:"Route is working fine"
    })
}

module.exports = {
    createProduct,
    getAllproducts
}