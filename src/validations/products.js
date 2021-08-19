
const joi = require('joi');

const products = joi.object({

id:          joi.number().empty().required(),
price :      joi.number().empty().required(),
title:       joi.string().empty().required(),
image:       joi.string().empty().required(),
category:    joi.string().empty().required(),
description: joi.string().empty().required()

});


const productsUpdate = joi.object({

price :      joi.number().empty().required(),
title:       joi.string().empty().required(),
image:       joi.string().empty().required(),
category:    joi.string().empty().required(),
description: joi.string().empty().required()

});

// export products validation
module.exports = {products ,productsUpdate};