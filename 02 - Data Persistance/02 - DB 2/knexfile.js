// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: false,
    connection: {
      filename: "./data/car-dealer.db3"
    },
    migrations: {
      directory: "./data/migrations"
    }
  }
};
