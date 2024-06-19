const mongoose = require('mongoose');
const {Schema} = mongoose;
const Ingredients = require('./Ingredients');

const NumberOfIngredients = new Schema({
    name: Ingredients,
    number: {type: Number, default: 1}
});

module.exports = mongoose.model('number_of_ingrediants',NumberOfIngredients);
