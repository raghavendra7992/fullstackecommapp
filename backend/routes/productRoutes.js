const express=require('express');
const { getAllproducts } = require('../cnt/productcntjs');

const router=express.Router();
 
router.get('/product',getAllproducts)



module.exports =router
