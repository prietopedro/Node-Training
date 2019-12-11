const knex = require("knex");
const config = require("../knexfile").development;

const db = knex(config);

const find = () => {
  return db("schemes");
};

const findById = id => {
  return db("schemes")
    .where({ id })
    .first();
};

const findSteps = id => {
  return db("schemes")
    .join("steps", "schemes.id", "steps.scheme_id")
    .select(
      "steps.id",
      "steps.step_number",
      "steps.instructions",
      "schemes.scheme_name"
    )
    .where("schemes.id", id);
};

const add = (data) => {
    return db('schemes').insert(data)
}

const update = (data,id)=>{
    return db('schemes').where({id}).update(data)
}

const remove = (id)=>{
    return db('schemes').where({id}).del()
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
