import Knex = require("knex");

// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "src/database/dev.sqlite3"
    },
    migrations: {
      directory: "src/database/migrations"
    },
    seeds: {
      directory: "src/database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  }
};
