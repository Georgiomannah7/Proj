const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
    registrationDate: {
        type: Date,
        required: true    
    }
})
module.exports= mongoose.model('User',userShema);

