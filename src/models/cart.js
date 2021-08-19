

const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({

    id:{
        type:Number
    },
    userId:{
        type:Number
    },
    date:{
        type:String
    },
    products:[
    {  
         
         productId : {
             type:Number
         },
         quantity:{
             type:Number
         } 
    }
    ]
  
});

module.exports = mongoose.model('Carts',cartSchema);


