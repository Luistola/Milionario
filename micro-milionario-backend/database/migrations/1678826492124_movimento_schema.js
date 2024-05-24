'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovimentoSchema extends Schema {
  up () {
    this.create('movimentos', (table) => {
      table.increments()
      table.integer('carteira_id')
      	.unsigned()
      	.references('id')
      	.inTable('carteiras');
        table.integer('pontos').defaultTo(0);
        table.integer('valor_unitel_m').defaultTo(0);
        table.string('tipo',45).nullable();
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('movimentos')
  }
}

module.exports = MovimentoSchema
