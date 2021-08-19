
const HttpError = require('http-errors');
const mongoose  = require('mongoose');


// importing user model
const cartsModel = require('../models/cart');

// importing filtered result helper
const FilterResult = require('./../helpers/filterdResult');


// to parse id
const ToId = mongoose.Types.ObjectId;


//FetchCartById
const FetchCartById = async(cid) => {
   data = await cartsModel.findOne({ id : cid}).select('-__v -_id');

   return data; 
};

//FetchCartByUserId
const FetchCartByUserId = async(uid) => {
   data = await cartsModel.findOne({userId:uid}).select('-__v -_id');;
   return data; 
};

// FetchAllCarts
const FetchAllCarts = async(pageData,startDate,endDate) => {
   
   let searchCondition ='';
   
   if(startDate !== null)
   {
      searchCondition ={ date : { $gte : startDate , $lte: endDate}  }
   }

   const data = await  FilterResult(cartsModel,pageData,searchCondition);
   return data;

};

// create 
const CreateCart = async(Valdata) => {
  
 const data = await cartsModel.create(Valdata);
 return data;  

};

// delete 
const DeleteCart = async(cid) => {
  const data = await cartsModel.findByIdAndDelete(cid);
  return data;  
};

//AddItemToCart
const AddItemToCart = async(userId,Valdata) => {
  
 const data = await cartsModel.findOneAndUpdate({ userId:userId });
 data.products.push(Valdata);
 data.save();

 return data;  

};

// RemoveItemFromCart
const RemoveItemFromCart = async(uid,pid) => {
  
 const data = await cartsModel.updateOne(
  { userId:uid },
 { $pull :{ products :{ productId : pid } } },
 { safe: true, multi:true }
 );


//  console.log( data.products);
 return data;  

};
// updateItemFromCart
const updateItemFromCart = async(uid,pid,quantity) => {
  
 const data = await cartsModel.findOneAndUpdate({ userId:uid });
 const index = data.products.findIndex( x => x.productId == pid );
 data.products[index].quantity = quantity;
 data.save();

 return data;  

};

const CartService = {
  CreateCart,
  DeleteCart,
  FetchCartById,
  FetchCartByUserId,
  FetchAllCarts,
  AddItemToCart,
  RemoveItemFromCart,
  updateItemFromCart
}


// export class
module.exports = CartService;