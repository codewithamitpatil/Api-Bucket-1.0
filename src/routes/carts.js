
const express = require('express');
const router  = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// importing user controller
const {
        Fetch ,FetchAll ,
        Create ,  Delete ,
        UserCart ,AddItemToCart   ,
        updateItemFromCart ,removeItemFromCart
     } = require('./../controllers/carts');

// intialize cart routes

// get cart  by user id
router.get('/user/:uid',asyncHandler(UserCart));
// get all cart 
router.get('/',asyncHandler(FetchAll));
// get cart  by cart id
router.get('/:cid',asyncHandler(Fetch));
// create cart 
router.post('/',asyncHandler(Create));

// delete cart 
router.delete('/:cid',asyncHandler(Delete));


// add cart item to users cart by itemId 
// if user want add more items to cart
router.post('/user/:uid',asyncHandler(AddItemToCart));
// update cart item to users cart by itemId
// if user change the quanitity for that
router.put('/user/:uid/:pid/:quantity',asyncHandler(updateItemFromCart));
// remove cart item by item itemId
// if user want to remove item from cart
router.delete('/user/:uid/:pid',asyncHandler(removeItemFromCart));

// exports routes
module.exports = router;