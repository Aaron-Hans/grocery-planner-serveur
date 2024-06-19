const mongoose = require('mongoose');
const {Schema} = mongoose;

const UnitOfMeasurementSchema = new Schema ({
    name: {
        type: String,
        enum: {
            values: ['Kg', 'g', 'L', 'ml', 'cl', 'nbr',null],
            message: "l'unité {VALUE} n'existte pas"
        },
    },
})

module.exports = mongoose.model('unit_of_measurement', UnitOfMeasurementSchema)