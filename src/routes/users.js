
const express = require('express');
const router  = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// importing user controller
const {  Fetch ,FetchAll , Create , Update , Delete } = require('./../controllers/users');

// intialize routes

// get all user
router.get('/',asyncHandler(FetchAll));
// get user by id
router.get('/:uid',asyncHandler(Fetch));
// create user
router.post('/',asyncHandler(Create));
// update user
router.put('/:uid',asyncHandler(Update));
// delete user
router.delete('/:uid',asyncHandler(Delete));



// exports routes
module.exports = router;