import Knex from "knex"
const config = require('../knexfile')

const db = Knex(config.development)

export default db;
