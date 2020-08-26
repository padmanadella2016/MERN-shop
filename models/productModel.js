const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
//ObjectId = Schema.ObjectId;
const productSchema =  new Schema({
_id : mongoose.Schema.Types.ObjectId,
productid:{ type:Number, },
name: { type:String,},
category:{type:String },
image: {type:String , require:true},
price: { type:Number, },
brand:{type:String},
rating:{type:Number},
numReviews:{type:Number},
countInStock:{type:Number, },

});

const productModel = mongoose.model("Product" , productSchema);

//export default userModel;
module.exports = productModel;