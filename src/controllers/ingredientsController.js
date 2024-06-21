const Ingredients = require('../models/Ingredients');
const UnitOfMeasurementController = require('./unitOfMeasurementController');
const UnitOfMeasurement = require('../models/UnitOfMeasurement');

exports.createIngredient = async (req, res) => {
    const name = req.body.nameOfIngredient;
    let unitName = req.body.nameOfUnitOfMeasurement;

    console.log(unitName)

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    let response = {
        unit: null,
        ingredient: null,
        error: []
    };

    try {
        if(!unitName){
            unitName = null;
        } 
        const unit = await UnitOfMeasurement.findOne({ name: unitName });

            if (!unit) {
                try {
                    const newUnit = new UnitOfMeasurement({ name: unitName });
                    unit = await newUnit.save();
                    response.unit = unit;
                } catch (error) {
                    if (error.name === 'ValidationError') {
                        response.error.push({ unitError: error.message });
                    }
                    console.log("Erreur lors de la création de l'unité de mesure.");
                }
            }
        const existingIngredient = await Ingredients.findOne({name: formattedName})
        if (existingIngredient){
            response.error.push({ ingredientError: "Un ingrédient avec ce nom existe déjà." });
            res.status(400).json(response);
            return;
        }
        const newIngredient = new Ingredients({
            name: formattedName,
            unitOfMeasurement: unit._id
        });

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

    try {
        const ingredient = await Ingredients.findOne({ name: name });
        res.json(ingredient);
    } catch (error) {
        console.error(error.message);
    }
};

exports.updateIngredient = async (req, res) => {
    const name = req.body.nameOfIngredient;
    const unitName = req.body.nameOfUnitOfMeasurement;

    const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    let unit = await UnitOfMeasurementController.findUnitOfMeasurementByName(unitName);

    if (!unit) {
        unit = await UnitOfMeasurementController.createUnitOfMeasurement(unitName);
        unit = await UnitOfMeasurementController.findUnitOfMeasurementByName(unitName);
    }

    const ingredient = await Ingredients.findOne({ name: newName });

    if (ingredient) {
        res.json(await Ingredients.updateOne({ _id: ingredient._id }, { $set: { unitOfMeasurement: unit._id } }));
    } else {
        res.status(404).json({ message: "Ingrédient non trouvé." });
    }
};
