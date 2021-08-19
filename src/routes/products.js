
const express = require('express');
const router  = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// importing user controller
const {  
    Fetch ,FetchAll ,
    Create , Update , Delete ,
    getProductsByCategorie ,
    categories
} = require('./../controllers/products');

// intialize product routes

// get all categories
router.get('/category',asyncHandler(categories));
// get all products by category
router.get('/categories/:category',asyncHandler(getProductsByCategorie));


// get all product
router.get('/',asyncHandler(FetchAll));
// get product by id
router.get('/:pid',asyncHandler(Fetch));
// create product
router.post('/',asyncHandler(Create));
// update product
router.put('/:pid',asyncHandler(Update));
// delete product
router.delete('/:pid',asyncHandler(Delete));

// exports routes
module.exports = router;