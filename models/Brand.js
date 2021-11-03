const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const brandShema = new Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        showNbrOfCars: {
            type: 'boolean',
            required: true
        }
    }
);
module.exports = mongoose.model('Brand',brandShema);



