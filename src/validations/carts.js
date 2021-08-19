
const joi = require('joi');

const carts = joi.object({
    userId:  joi.number().empty().required(),
    id:      joi.number().empty().required(),
    date:    joi.string().empty().required(),
    products:joi.array().items(
    joi.object({
        productId : joi.number().empty().required(),
        quantity :  joi.number().empty().required()
    })
    ) 

});


//for cart item
const cartItem =joi.object({
    productId : joi.number().empty().required(),
    quantity :  joi.number().empty().required()
});

// export carts validation
module.exports ={
    carts,
    cartItem
};