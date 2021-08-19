const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const todosSchema = mongoose.Schema({
        userId: { type:Number },
        id:{ type:Number },
        title:{ type:String },
        completed:{ type:Boolean }
}); 

todosSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
    return object;
  });

todosSchema.index({'$**': 'text'});

todosSchema.plugin(mongoosePaginate);


// export todos model
module.exports = mongoose.model("Todo",todosSchema);