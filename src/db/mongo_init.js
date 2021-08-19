
const mongoose = require('mongoose');

// importing config
const { mongodb ,mongodbOptions } = require('./../config');

// importing logger
const logger = require('./../logger');

// create mongodb connection
const Connect =()=>{
    mongoose.connect(mongodb ,mongodbOptions );
    mongoose.Promise = global.Promise;
    return mongoose.connection;;
}

// module export
module.exports = Connect;


