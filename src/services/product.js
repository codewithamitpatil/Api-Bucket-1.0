
const HttpError = require('http-errors');
const mongoose  = require('mongoose');


// importing user model
const productModel = require('../models/product');

// importing filtered result helper
const FilterResult = require('./../helpers/filterdResult');


// to parse id
const ToId = mongoose.Types.ObjectId;


//Fetch 
const Fetch = async(pid) => {
   data = await productModel.findOne({ id : pid}).select('-__v -_id');
   return data; 
};

// GetProductByCategorie
const GetProductByCategorie = async(category,pageData,start,end) => {

    let searchCondition ='';

    searchCondition ={ category : category  };

    if(start !== null)
    {
        searchCondition ={ category : category , price : { $gte : start , $lte : end }  }
    }
 
   const data = await  FilterResult(productModel,pageData,searchCondition);
   return data;

};
//Categories
const Categories = async() => {
   data = productModel.find().distinct('category',(err,datas)=>{
       console.log(err);
       console.log(datas);
       return datas;
   });
   return data; 
};


// FetchAll
const FetchAll = async(pageData,title,start,end) => {
   
   let searchCondition ='';
   
   if(title !== null)
   {
      searchCondition ={ title :  new RegExp(title)  }
   }

   if(start !== null)
    {
        searchCondition ={ ...searchCondition, price : { $gte : start , $lte : end }  }
    }
 
   const data = await  FilterResult(productModel,pageData,searchCondition);
   return data;

};
// create 
const Create = async(Valdata) => {
  
 const data = await productModel.create(Valdata);
 return data;  

};

// update 
const Update= async(pid,valData) => {

const data = await productModel.findOneAndUpdate({ id:pid},valData);
return data; 

};

// delete 
const Delete = async(pid) => {
  const data = await productModel.findOneAndDelete({id:pid});
  return data;  
};


// export controllers
module.exports = { 
  Fetch ,
  FetchAll ,
  Create ,
  Update ,
  Delete ,
  GetProductByCategorie ,
  Categories
};