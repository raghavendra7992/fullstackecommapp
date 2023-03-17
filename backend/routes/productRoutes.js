const express=require('express');
const { getAllproducts,createProduct } = require('../cnt/productcnt.js');

const router=express.Router();
 
router.get('/product',getAllproducts);
router.post("/product/newprod",createProduct)



module.exports =router
