'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.integer('user_id')
      	.unsigned()
      	.references('id')
      	.inTable('users');
      table.string('nome',45).nullable();
      table.string('sexo',45).nullable();
      table.string('telefone',45).nullable();
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
