const Ingredients = require('../models/Ingredients');
const UnitOfMeasurement = require('../models/UnitOfMeasurement');
const unitOfMeasurementController = require('../controllers/unitOfMeasurementController')

exports.createIngredient = async (req, res) => {
    const name = req.body.nameOfIngredient;
    let unitName = req.body.nameOfUnitOfMeasurement;
    let unit;

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    let response = {
        ingredient: null,
        error: []
    };

    try {
        if(!unitName){
            unitName = null;
        } 
        unit = await UnitOfMeasurement.findOne({ name: unitName });

            if (!unit) {
                unit = unitOfMeasurementController.createUnitOFMeasurement(unitName)
            }
        const existingIngredient = await Ingredients.findOne({name: formattedName})
        if (existingIngredient){
            response.error.push({ ingredientError: "Un ingrédient avec ce nom existe déjà." });
            res.status(400).json(response);
            return;
        }

        const newIngredient = new Ingredients({name: formattedName,unitOfMeasurement: unit._id});
        const savedIngredient = await newIngredient.save();

        response.ingredient = savedIngredient;
    } catch (error) {
        if (error.code === 11000) {
            response.error.push({ ingredientError: "Un ingrédient avec ce nom existe déjà." });
        } else {
            response.error.push({ ingredientError: error.message });
        }
    }

    if (response.error.length > 0) {
        res.status(400).json(response);
    } else {
        res.status(201).json(response);
    }
};

exports.findAllIngredients = async (req, res) => {
    try {
        const allIngredients = await Ingredients.find();
        res.json(allIngredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findIngredientByName = async (req, res) => {
    const name = req.body.nameOfIngredient;

    let response = {
        ingredient: null,
        error: []
    };

    const ingredient = await Ingredients.findOne({ name: name });
    if (!ingredient) {
        response.error.push({ingredientError: "cette Objet n'existe pas"});
    }
    response.ingredient = ingredient;

    if (response.error.length > 0) {
        res.status(400).json(response);
    } else {
        res.status(201).json(response);
    }
};

exports.updateIngredient = async (req, res) => {
    let currentName = req.body.currentName;
    let updatedName = req.body.updatedNameOfIngredient;
    const unitName = req.body.nameOfUnitOfMeasurement;

    currentName = currentName.charAt(0).toUpperCase() + currentName.slice(1).toLowerCase();
    updatedName = updatedName.charAt(0).toUpperCase() + updatedName.slice(1).toLowerCase();

    let unit = await UnitOfMeasurement.findOne({name:unitName});

    if (!unit) {
        unit = await unitOfMeasurementController.createUnitOFMeasurement(unitName);
    }

    const ingredient = await Ingredients.findOne({ name: currentName });

    if (ingredient) {
        res.json(await Ingredients.updateOne({ _id: ingredient._id }, { $set: {name: updatedName, unitOfMeasurement: unit._id } }));
    } else {
        res.status(404).json({ message: "Ingrédient non trouvé." });
    }
};

exports.deleteIngredientByName = async (req, res) => {
    let ingredientToDelete = req.body.ingredientToDelete;
    
    ingredientToDelete = ingredientToDelete.charAt(0).toUpperCase() + ingredientToDelete.slice(1).toLowerCase();
    
    try {
        const result = await Ingredients.deleteOne({ name: ingredientToDelete });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: `L'ingrédient ${ingredientToDelete} n'a pas été trouvé.` });
        } else {
            res.json({ message: `L'ingrédient ${ingredientToDelete} a été supprimé.` });
        }
    } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'ingrédient.' });
    }
};