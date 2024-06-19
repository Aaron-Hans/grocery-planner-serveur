const mongoose = require('mongoose');
const {Schema} = mongoose;
const IngrediantsSchema = require('./Ingredients')

const DishesSchema = new Schema({
    name:{type: String, require: true},
    ingredient: [IngrediantsSchema],
    number:{type: Number, default: 1}
})
module.exports = mongoose.model('dishes', DishesSchema)