
const express = require('express');
const router  = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// importing todos controller
const {Fetch ,FetchAll , Create , Update , Delete } = require('../controllers/todos');

// intialize routes

// get all todo
router.get('/',asyncHandler(FetchAll));
// get todo by id
router.get('/:tid',asyncHandler(Fetch));
// create todo
router.post('/',asyncHandler(Create));
// update todo
router.put('/:tid',asyncHandler(Update));
// delete todo
router.delete('/:tid',asyncHandler(Delete));


// exports routes
module.exports = router;