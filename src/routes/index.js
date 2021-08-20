
const express = require('express');
const router  = express.Router();

// importing  routes
//const auth_v1 = require('./auth');
const user_v1 = require('./users');
const todos_v1 = require('./todos');
const carts_v1 = require('./carts');
const products_v1 = require('./products');

// intialize routes
//router.use('/auth',auth_v1);
router.use('/users',user_v1);
router.use('/todos',todos_v1);
router.use('/carts',carts_v1 );
router.use('/products',products_v1 );

// module exports
module.exports = router ;
