exports.up = function(knex) {
  return knex.schema
    .createTable("projects", table => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("tasks", table => {
      table.increments("id");
      table.string("description", 255).notNullable();
      table.string("notes", 255);
      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
      table
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("projects");
    })
    .createTable("resources", table => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
    })
    .createTable("project_resources", table => {
      table
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("projects");
      table
        .integer("resource_id")
        .notNullable()
        .references("id")
        .inTable("resources");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
