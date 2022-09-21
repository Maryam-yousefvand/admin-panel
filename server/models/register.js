const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let registerSchema = new Schema({
   
    name: {
        type: String
    },
    fullname:{
        type:String
    },
    email: {
        type: String
    },
    password:{
        type:String
    },
    createdAt :{
        type:String
    }
}, {
        collection: 'register'
    })
module.exports = mongoose.model('Register', registerSchema)