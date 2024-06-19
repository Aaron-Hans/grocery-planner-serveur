const express = require('express');
const router = express();
const unitOFMeasurementController = require('../controllers/unitOfMeasurementController');

router.post('/create-unit', unitOFMeasurementController.createUnitOFMeasurement);
router.get('/find-all-unit', unitOFMeasurementController.findAllUnitOFMeasurement);
router.get('/find-unit-by-name', unitOFMeasurementController.findUnitOFMeasurementByName);

module.exports = router;