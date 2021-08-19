
const HttpError = require('http-errors')

// importing user validation
const usersVal = require('../validations/users');

// importing user service
const userService = require('./../services/user');

// importing pagination handler
const modifyQueryData = require('../helpers/queryModifier');


// Fetch by id
const Fetch = async(req,res,next) => {

  const uid   = req.params.uid;
  const format = parseInt(req.query.f);
  const sort   = parseInt(req.query.s);

  const data = await userService.FetchUserById(uid,format,sort);
 
  res.send(data);

};

// Fetch all
const FetchAll = async(req,res,next) => {

 const pageData = await modifyQueryData(req.query);
 
 const uname = req.query.username || false;

 const data = await userService.FetchAllUsers(pageData,uname);
 
  res.send(data);

};

// Create
const Create = async(req,res,next) => {

  const valData = await usersVal.validateAsync(req.body);

  const userData = await userService.CreateUser(valData);

  res.json({
     "status" : 200 ,
     "message":"User Created SuccessFully",
     "data":userData
  });

};

// Update
const Update = async(req,res,next) => {

  const uid     = req.params.uid;

  const valData = await usersVal.validateAsync(req.body);

  const temp    =  await userService.UpdateUser(uid,valData);
  
  const resFormat = { 
    temp ,
    status:200 , 
    message:"User Updated SuccessFully"
  };

  res.send(resFormat);


};

// Delete
const Delete = async(req,res,next) => {

  const uid   = req.params.uid;

  const temp  = await userService.DeleteUser(uid);
  
  const resFormat = { 
    status:200 , 
    message:"User Deleted SuccessFully"
  };

  res.send(resFormat);


};


// export controllers
module.exports = {Fetch ,FetchAll , Create , Update , Delete };