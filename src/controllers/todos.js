
HttpError = require('http-errors')

// importing todo service
const todoService = require('./../services/todo');

// importing todo validation
const todosVal = require('../validations/todos');

// importing pagination handler
const modifyQueryData = require('../helpers/queryModifier');


// Fetch by id
const Fetch  = async(req,res,next) => {
  
  const tid  = req.params.tid;

  const data =  await todoService.FetchTodosById(tid);
  
  res.send(data);

};

// Fetch all
const FetchAll = async(req,res,next) => {

  const pageData = await modifyQueryData(req.query);

  const data   =  await todoService.FetchAllTodos(pageData);
  
  res.send(data);

};

const Filter =async(req,res,next)=>{
  
  const pageData = await getPagination(req.query);

  const data   =  await todoService.AdvanceResult(pageData);
  
  res.send(data);

}

// Create
const Create = async(req,res,next) => {

  const valData = await todosVal.validateAsync(req.body);
  
  const temp =  await todoService.CreateTodo(data);
  
  res.json({
     "status" : 200 ,
     "message":"Todo Created SuccessFully"
  });

};

// Update
const Update = async(req,res,next) => {

  const tid     = req.params.tid;

  const valData = await todosVal.validateAsync(req.body);

  const temp    =  await todoService.UpdateTodo(tid,valData);
  
  const resFormat = { 
    temp ,
    status:200 , 
    message:"Todo Updated SuccessFully"
  };

  res.send(resFormat);



};

// Delete
const Delete = async(req,res,next) => {

  const tid     = req.params.tid;

  const temp    =  await todoService.DeleteTodo(tid);
  
  const resFormat = { 
    status:200 , 
    message:"Todo Deleted SuccessFully"
  };

  res.send(resFormat);


};

// export controllers
module.exports = { 
  Fetch ,
  FetchAll ,
  Create ,
  Update ,
  Delete 
};