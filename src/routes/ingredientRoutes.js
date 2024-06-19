const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

router.post('/create-ingredient', ingredientsController.createIngredient);
router.post('/update-ingredient', ingredientsController.updateIngredient);
router.get('/find-all-ingredient', ingredientsController.findAllIngredients);
router.get('/find-ingredient-by-name', ingredientsController.findIngredientByName);

module.exports = router