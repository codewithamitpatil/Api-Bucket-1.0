
const joi = require('joi');

const users = joi.object({

id:       joi.number().empty().required(),
email:    joi.string().email().empty().required(),
username: joi.string().empty().required(),
password: joi.string().empty().required(),
phone:    joi.string().empty().required(),

__v:joi.number().optional(),

name: joi.object({
    firstname: joi.string().empty().required(),
    lastname: joi.string().empty().required()
}),
address:  joi.object({
    geolocation:joi.object({
    lat:    joi.string().empty().required(),
    long:   joi.string().empty().required()
    }),
    city:   joi.string().empty().required(),
    street: joi.string().empty().required(),
    number: joi.number().empty().required(),
    zipcode:joi.string().empty().required()
}),


});// to get all error at same time
//.options({abortEarly : false }); 



// export users validation
module.exports = users;