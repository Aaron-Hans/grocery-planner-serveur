const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

router.post('/create-ingredient', ingredientsController.createIngredient);
router.post('/update-ingredient', ingredientsController.updateIngredient);
router.get('/find-all-ingredient', ingredientsController.findAllIngredients);
router.get('/find-ingredient-by-name', ingredientsController.findIngredientByName);
router.delete('/delete-ingredient-by-name', ingredientsController.deleteIngredientByName);

module.exports = router