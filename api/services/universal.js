const knex = require("knex");
const devConfig = require("../../knexfile").development;

const db = knex(devConfig);

const get = table => {
  return db(table);
};

const getById = (table, id) => {
  return db(table)
    .where({ id })
    .first();
};

const insert = (table,car) => {
    return db(table).returning('id').insert(car)
}

module.exports = { get, getById,insert };
