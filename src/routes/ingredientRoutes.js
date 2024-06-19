const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

router.post('/create-ingredient', ingredientsController.createIngredient)

module.exports = router