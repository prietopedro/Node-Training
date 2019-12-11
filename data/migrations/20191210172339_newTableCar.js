//VIN, make, model, and mileage.
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .integer("vin")
      .notNullable()
      .unique();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.integer('mileage').notNullable();
    tbl.string('transmition_type');
    tbl.string('title');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cars");
};
