class Car {
  constructor(vin, make, model, mileage, transmition_type, title) {
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.mileage = mileage;
    if (transmition_type) {
      this.transmition_type = transmition_type;
    }
    if (title) {
      this.title = title;
    }
  }
}
module.exports = Car;