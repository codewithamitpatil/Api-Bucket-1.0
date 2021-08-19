
const joi = require('joi');

const todos = joi.object({
    userId:   joi.number().empty().required(),
    id:       joi.number().empty().required(),
    title:    joi.string().empty().required(),
    completed:joi.boolean().empty().required()
});

// export todos validation
module.exports = todos;