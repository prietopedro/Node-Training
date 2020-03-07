import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users',(tbl)=>{
        tbl.increments();
        tbl.string('username',255).notNullable().unique();
        tbl.string('password',255).notNullable().unique();
    })
}


export async function down(knex: Knex): Promise<any> {
    knex.schema.dropTableIfExists('users');
}

