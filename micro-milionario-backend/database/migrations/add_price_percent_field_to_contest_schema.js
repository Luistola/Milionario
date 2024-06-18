'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PricePercentFieldToContest extends Schema {
  up() {
    this.table('concursos', (table) => {
      // alter table
      table.integer('price_percent').defaultTo(0)
    })
  }

  down() {
    this.table('concursos', (table) => {
      // reverse alternations
      table.integer('price_percent').defaultTo(0)
    })
  }
}

module.exports = PricePercentFieldToContest
