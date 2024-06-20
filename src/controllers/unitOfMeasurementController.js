const UnitOFMeasurement = require('../models/UnitOfMeasurement');

exports.findAllUnitOFMeasurement = async (req,res) => {
    try {
        const allUnitOFMeasurement = await UnitOFMeasurement.find()
        res.json(allUnitOFMeasurement)
    } catch (error) {
        res.status.json({message: error.message})
    }
}

exports.findUnitOFMeasurementByName = async (req, res) => {
    const name = req.body.nameOfUnitOFMeasurement;
    try {
        const unitOFMeasurement = await UnitOFMeasurement.findOne({ name: name });
        res.json(unitOFMeasurement);
    } catch (error) {
        console.error(error);
    }
};

exports.createUnitOFMeasurement = async (req, res) => {
    const unitName = req.body.name;
    const unitOFMeasurement = new UnitOFMeasurement({
        name: unitName,
    });

    try{
        const newUnitOFMeasurement = await unitOFMeasurement.save();
        return newUnitOFMeasurement
    } catch (error) {
        if(error.name == 'ValidationError'){
            console.log({error: error.message})
        }
        console.log("une erreur c'est produit l'ors de la création de l'unit")
    }
}