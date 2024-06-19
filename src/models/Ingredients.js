const mongoose = require('mongoose');
const {Schema} = mongoose;

const IngrediantsSchema = new Schema({
    name: {type: String, unique: true, required: true},
    unitOfMeasurement: {type: mongoose.Schema.Types.ObjectId, ref: 'unit_of_measurement', require: true},
})

module.exports = mongoose.model('ingredients', IngrediantsSchema)