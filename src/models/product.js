
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    id:{
        type:Number
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    image:{
        type:String
    }

});

module.exports = mongoose.model('Products',productSchema);