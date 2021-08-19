
HttpError = require('http-errors')

// importing todo service
const productService = require('./../services/product');

// importing todo validation
const { products ,productsUpdate} = require('../validations/products');

// importing pagination handler
const modifyQueryData = require('../helpers/queryModifier');


// Fetch by id
const Fetch  = async(req,res,next) => {
  
  const pid  = req.params.pid;

  const data =  await productService.Fetch(pid);

  res.send(data);       


  

};

// Fetch all
const FetchAll = async(req,res,next) => {

  const pageData = await modifyQueryData(req.query);
  const title  = req.query.title || null ;
  const start  = req.query.start || null;
  const end    = req.query.end  || 100000;

  const data   =  await productService.FetchAll(pageData,title,start,end);
  
  res.send(data);

};

// GetProductByCategorie
const getProductsByCategorie = async(req,res,next) => {

  const pageData = await modifyQueryData(req.query);
  const category = req.params.category;
  const start  = req.query.start || null;
  const end    = req.query.end  || 100000;
  const data   =  await productService.GetProductByCategorie(category,pageData,start,end);
  
  res.send(data);

};
//  Categories
const categories = async(req,res,next) => {

  const data   =  await productService.Categories();
  
  res.send(data);

};

// Create
const Create = async(req,res,next) => {

  const valData = await products.validateAsync(req.body);
  
  const temp =  await productService.Create(valData);
  
  res.json({
     "status" : 200 ,
     "message":"Product Created SuccessFully"
  });

};

// Update
const Update = async(req,res,next) => {

  const pid     = req.params.pid;

  const valData = await productsUpdate.validateAsync(req.body);

  const temp    =  await productService.Update(pid,valData);
  
  const resFormat = { 
    status:200 , 
    message:"Product Updated SuccessFully"
  };

  res.send(resFormat);



};

// Delete
const Delete = async(req,res,next) => {

  const pid     = req.params.pid;

  const temp    =  await productService.Delete(pid);
  
  const resFormat = { 
    status:200 , 
    message:"Product Deleted SuccessFully"
  };

  res.send(resFormat);


};




// export controllers
module.exports = { 
  Fetch ,
  FetchAll ,
  Create ,
  Update ,
  Delete ,
  getProductsByCategorie ,
  categories
};