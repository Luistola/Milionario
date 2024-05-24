'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIsdeleteOnUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.boolean('is_delete')
      .defaultTo(false)
      .after('password');

    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddIsdeleteOnUserSchema
