const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rentalShema= new Schema({
    userFirstName:{
        type: String,
        required: true
    },
    userLastName:{
        type: String,
        required: true
    },
    userMobileNumber:{
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Rental',rentalShema);