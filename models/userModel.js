// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
// }, {
//   timestamps: true,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
name: { type:String, required:true},
email:{type:String , required:true , unique: true , dropDups: true},
password: {type:String, required:true},
isAdmin: { type:Boolean, required:true , default:false},
},{
   timestamps: true,
}
);

const User = mongoose.model("User" , userSchema);

//export default userModel;
module.exports = User;