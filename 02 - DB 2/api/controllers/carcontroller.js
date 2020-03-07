const express = require('express')

const router = express.Router();
const services = require('../services/carservices')

// GET ALL CARS
router.get('/',services.getAllCars)

//GET CAR BY ID
router.get('/:id',services.getCarById)

// // UPDATE CAR
// router.put('/:id')

// // DELETE CAR
// router.delete('/:id')

// POST CAR
router.post('/',services.postNewCar)


module.exports = router;