
const HttpError = require('http-errors');
const mongoose  = require('mongoose');

// importing user model
const usersModel = require('../models/users');

// importing filtered result helper
const FilterResult = require('./../helpers/filterdResult');


// to parse id
const ToId = mongoose.Types.ObjectId;


// fetch
const FetchUserById = async(uid,format,sort) => {
  
  let aggQuery;
  let project_condition;
  let unwind_condition;
  let sort_condition;

  let match_condition = {
         _id : ToId(uid) 
      };

  let lookup_condition = {  
          from: 'todos',
          localField: 'id',
          foreignField: 'userId',
          pipeline:[
              { $sort : { id: sort || 1}  }
          ],
          as: 'todos'
      };


  switch(format){
    case 1: 
          
          project_condition = {
                _id:0,
                address:0,
                name:0,
                __v:0 
           };

            aggQuery = [
              { $match   :  match_condition   },
              { $lookup  :  lookup_condition  },
              { $project :  project_condition }
            ];
    break;

    case 2:
         
            project_condition = {
                    _id:0,
                    address:0,
                    name:0,
                    __v:0 
            };
              
         unwind_condition = {
              path :'$todos', 
              preserveNullAndEmptyArrays: true
          };

            aggQuery = [
              { $match  :  match_condition  },
              { $lookup :  lookup_condition },
              { $unwind :  unwind_condition },
              { $project : project_condition }
            ];
    break;

    case 3:
         
            project_condition = {
                    _id:0,
                    address:0,
                    name:0,
                    __v:0 ,
                   todos:0
            };
              
          unwind_condition = {
              path :'$todos', 
              preserveNullAndEmptyArrays: true
          };
 
          let replace_condition ={ 
            newRoot : {
               $mergeObjects: ["$$ROOT",'$todos'] 
          }}; 

          sort_condition = {
             id: sort || 1
          };

          aggQuery = [
            { $match       :  match_condition  },
            { $lookup      :  lookup_condition },
            { $unwind      :  unwind_condition },
            { $replaceRoot :  replace_condition },
            { $sort        :  sort_condition    },
            { $project     :  project_condition },
          ];
    break;


    default :
        aggQuery = [
          { $match  :  match_condition  },
          { $lookup :  lookup_condition }
      ];
    
  }

  const data = await usersModel.aggregate(aggQuery);
  return data;
};

// fetchAll
const FetchAllUsers = async(pageData,username) => {
   
   let searchCondition ='';
 
   if(username)
   {
      searchCondition ={username : username}
   }else{
     searchCondition ={};
   }
    
   const usersData = await  FilterResult(usersModel,pageData,searchCondition);
   return usersData;

};

// create 
const CreateUser = async(Valdata) => {
  
 const data = await usersModel.create(Valdata);
 return data;  

};

// update 
const UpdateUser = async(uid,valData) => {

const data = await usersModel.findByIdAndUpdate(uid,valData);
return data; 

};

// delete 
const DeleteUser = async(uid) => {
  const data = await usersModel.findByIdAndDelete(uid);
  return data;  
};


const UserService = {
  CreateUser,
  UpdateUser,
  DeleteUser,
  FetchUserById,
  FetchAllUsers
}


// export class
module.exports = UserService;