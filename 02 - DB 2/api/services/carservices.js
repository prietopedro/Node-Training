const db = require("./universal");
const Car = require("../models/carmodel");

const getAllCars = async (req, res) => {
  try {
    const cars = await db.get("cars");
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: "System Error" });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await db.getById("cars", req.params.id);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: "System Error" });
  }
};

const postNewCar = async (req, res) => {
  const {vin,make,model,mileage,transmition_type,title} = req.body;
  const newCar = new Car(
    vin,
    make,
    model,
    mileage,
    transmition_type || null,
    title || null
  );
  try {
    const addedCar = await db.insert("cars", newCar);
    res.status(200).json({ id: addedCar[0], ...newCar });
  } catch (error) {
    res.status(500).json({ error: "System Error" });
  }
};
module.exports = { getAllCars, getCarById, postNewCar };
