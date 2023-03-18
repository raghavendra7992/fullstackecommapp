const express=require('express');
const { getAllproducts,createProduct, updateProduct, deleteProduct, singleProduct } = require('../cnt/productcnt.js');

const router=express.Router();
 
router.get('/product',getAllproducts);
router.get("/:id",singleProduct);
router.post("/newprod",createProduct);
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct);




module.exports =router
