'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddroleidInUserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      // alter table
      table.integer('role_id')
        .unsigned()
        .index('role_id')
        .notNullable()
        .references('id')
        .inTable('roles')
        .after('id');
    })
  }

  down () {
    this.table('addroleid_in_users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddroleidInUserSchema
