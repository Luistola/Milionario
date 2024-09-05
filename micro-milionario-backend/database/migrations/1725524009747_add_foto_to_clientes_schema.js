'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFotoToClientesSchema extends Schema {
  up () {
    this.table('clientes', (table) => {
      // Add a new 'foto' field to the 'clientes' table
      table.string('foto', 255).nullable();
    })
  }

  down () {
    this.table('clientes', (table) => {
      // Remove the 'foto' field in case of rollback
      table.dropColumn('foto');
    })
  }
}

module.exports = AddFotoToClientesSchema
