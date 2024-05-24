'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarteiraSchema extends Schema {
  up () {
    this.create('carteiras', (table) => {
      table.increments()
      table.integer('user_id')
      	.unsigned()
      	.references('id')
      	.inTable('users');
        table.integer('pontos').defaultTo(0);
        table.integer('valor_unitel_m').defaultTo(0);
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('carteiras')
  }
}

module.exports = CarteiraSchema
