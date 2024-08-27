'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PricePercentFieldToContest extends Schema {
  up() {
    this.table('concursos', (table) => {
      // alter table
      table.boolean('is_winner_generated').defaultTo(false);
    })
  }

  down() {
    this.table('concursos', (table) => {
      // reverse alternations
      table.boolean('is_winner_generated').defaultTo(false);
    })
  }
}

module.exports = PricePercentFieldToContest
