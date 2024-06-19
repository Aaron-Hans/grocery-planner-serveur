const Ingredients = require('../models/Ingredients');
const UnitOfMeasurementController = require('./unitOfMeasurementController');

exports.createIngredient = async(req, res) => {
    const name = req.body.nameOfIngredient;
    const unitName = req.body.nameOfUnitOFMeasurement;

    // Vérifier si l'unité de mesure existe déjà
    let unit = await UnitOfMeasurementController.findUnitOFMeasurementByName(unitName);

    // Création de l'unité si elle n'existe pas
    if(unit == null){
        let newUnit = await UnitOfMeasurementController.createUnitOFMeasurement(unitName)
        unit = await UnitOfMeasurementController.findUnitOFMeasurementByName(newUnit);
    }

    // Créer l'ingrédient avec l'unité de mesure
    const ingredients = new Ingredients({
        name: name,
        unitOfMeasurement: unit._id,
    });

    try {
        const newIngredient = await ingredients.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({message: "Un ingrédient avec ce nom existe déjà."});
        } else {
            res.status(400).json({message: error.message});
        }
    }
}
