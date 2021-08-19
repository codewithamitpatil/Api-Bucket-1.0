
HttpError = require('http-errors')
const moment = require('moment');

// importing todo service
const todoService = require('./../services/todo');

// importing cart service
const cartService = require('./../services/cart');


// importing todo validation
const { cartItem , carts } = require('../validations/carts');

// importing pagination handler
const modifyQueryData = require('../helpers/queryModifier');


// Fetch by id
const Fetch  = async(req,res,next) => {
  
  const cid  = req.params.cid;

  const data =  await cartService.FetchCartById(cid);
  
  res.send(data);

};

// Fetch all
const FetchAll = async(req,res,next) => {

  const pageData = await modifyQueryData(req.query);
  
  const DATE = moment().format('YYYY-MM-DD');

  const startDate = req.query.startDate || ''; 
  const endDate = req.query.endDate || DATE; 

  const data   =  await cartService.FetchAllCarts(pageData,startDate,endDate);
  
  res.send(data);

};

// Create
const Create = async(req,res,next) => {

  const valData = await carts.validateAsync(req.body);
 
  const temp =  await cartService.CreateCart(valData);
  
  res.json({
     "status" : 200 ,
     "message":"Cart Created SuccessFully"
  });

};


// Delete
const Delete = async(req,res,next) => {

  const cid     = req.params.cid;

  const temp    =  await cartService.DeleteCart(cid);
  
  const resFormat = { 
    status:200 , 
    message:"Cart Deleted SuccessFully"
  };

  res.send(resFormat);


};


// UserCart Fetch by uid
const UserCart = async(req,res,next) => {
  
  const uid  = req.params.uid;

  const data =  await cartService.FetchCartByUserId(uid);
  
  res.send(data);

};

// AddItemToCart  
const AddItemToCart = async(req,res,next) => {

   const valData = await cartItem.validateAsync(req.body);
   const uid  = req.params.uid;
   const temp =  await cartService.AddItemToCart(uid,valData);
  
  res.json({
     "status" : 200 ,
     "message":"Item Added To Cart SuccessFully"
  });

}; 
// updateItemFromCart (update quantity) ,
const updateItemFromCart = async(req,res,next) => {

  const uid      = req.params.uid;
  const pid      = req.params.pid;
  const quantity = req.params.quantity;
  
  const temp    =  await cartService.updateItemFromCart(uid,pid,quantity);
  
  const resFormat = { 
    status:200 , 
    message:"Cart Item Updated SuccessFully"
  };

  res.send(resFormat);



};
// removeItemFromCart
const removeItemFromCart = async(req,res,next) => {

  const uid     = req.params.uid;
  const pid     = req.params.pid;

  const temp    = await cartService.RemoveItemFromCart(uid,pid);
  
  const resFormat = { 
    status:200 , 
    message:"Item Removed From Cart SuccessFully"
  };

  res.send(resFormat);


};


// export controllers
module.exports = { 
  Fetch ,
  FetchAll ,
  Create ,
  Delete ,
  UserCart ,
  AddItemToCart   ,
  updateItemFromCart ,
  removeItemFromCart
    

};