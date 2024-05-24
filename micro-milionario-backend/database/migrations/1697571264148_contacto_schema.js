'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactoSchema extends Schema {
  up () {
    this.create('contactos', (table) => {
      table.increments()
      table.string('nome', 80).notNullable();
      table.string('email', 254).notNullable();
      table.string('descricao',255).nullable();
      table.boolean('is_active').defaultTo(false);
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('contactos')
  }
}

module.exports = ContactoSchema
