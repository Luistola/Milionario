'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParametroSchema extends Schema {
  up () {
    this.create('parametros', (table) => {
      table.increments()
      table.string('nome',45).nullable();
      table.string('valor',45).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('parametros')
  }
}

module.exports = ParametroSchema
