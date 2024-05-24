'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPremioInVencedorsSchema extends Schema {
  up () {
    this.table('vencedors', (table) => {
      // alter table
      table.integer('premio')
            .defaultTo(0)
           .after('total_votos');
    })
  }

  down () {
    this.table('add_premio_in_vencedors', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddPremioInVencedorsSchema
