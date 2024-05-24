'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNvencedorInConcursoSchema extends Schema {
  up () {
    this.table('concursos', (table) => {
      // alter table
      table.integer('n_vencedor')
            .defaultTo(0)
           .after('premio');
    })
  }

  down () {
    this.table('concursos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddNvencedorInConcursoSchema
