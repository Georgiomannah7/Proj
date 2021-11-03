const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carsShema= new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    NbrOfRent : {
        type: Number,
        required: true,
        defaultValue: 0
    },
    Image:{
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    updatedAt:{ type :Date
    },
    CategoryName: {
        type: String,
        required: true}
});



module.exports =mongoose.model('Cars',carsShema);
