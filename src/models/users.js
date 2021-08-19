
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const usersSchema = mongoose.Schema({

   address:{
      geolocation:{
          lat:{ type:String },
          long:{ type:String }
      },
      city:{
        type:String
      },
      street:{
        type:String
      },
      number:{
         type:Number
      },
      zipcode:{
        type:String
      }
   }
    ,
   name:{
        firstname:{ type:String},
        lastname:{ type:String}
    }  
      , 
   email:{
       type:String
   },
   username:{
       type:String
   },
   password:{
       type:String
   },
   phone:{
       type:String
   },
   id:{
     type:Number
   }


}); 

usersSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

usersSchema.plugin(mongoosePaginate);

// export user model
module.exports = mongoose.model('User',usersSchema);
