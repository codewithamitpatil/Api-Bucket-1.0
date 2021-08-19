
const HttpError = require('http-errors');
const mongoose  = require('mongoose');


// importing user model
const todosModel = require('../models/todos');


// importing filtered result helper
const FilterResult = require('./../helpers/filterdResult');


// global variable
let data;

// Todo service class


class TodoService {


// fetch all todos
static async FetchAllTodos(pageData)
{
  
    let searchCondition = { title : new RegExp(pageData.search) };

    const temp11 = await  FilterResult(todosModel,pageData,searchCondition);

    return temp11;

};



static async FetchTodosById(uid,format,sort)
{
   data = await todosModel.findById(tid);
   return data; 
};

// advance result
static async AdvanceResult(select,sort,filter,Page,Limit,search)
{

   let Sort ={};
   let condition ={} ;
   
    filter == '' ? '' : condition.completed = filter;

    search == '' ? '' : condition.title  = { $regex: new RegExp( search)} ;

    sort == 'id'  ? Sort.id = 1 : '' ;
    sort == '-id' ? Sort.id = -1 : '' ;
    sort ==  'userId' ? Sort.userId = 1 : '';  
    sort ==  '-userId' ? Sort.userId = -1 : '';  

   const data = await todosModel.paginate(condition,{
      page:Page,
      limit:Limit,
      sort:Sort,
      select : select 
   })
  
   return data; 

};



// create 
static async CreateTodo(data){
  
   data = await todosModel.create(data);
   return data; 

};

// update 
static async UpdateTodo(uid,valData){
 
   data  =  await todosModel.findByIdAndUpdate(tid,valData);
   return data; 

};

// delete 
static async DeleteTodo(uid){
  
    data  =  await todosModel.findByIdAndDelete(tid);
    return data; 

};


};


// export class
module.exports = TodoService;