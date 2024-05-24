'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConcursoSchema extends Schema {
  up () {
    this.create('concursos', (table) => {
      table.increments()
      table.string('nome',45).nullable();
      table.string('descricao',255).nullable();
      table.string('foto',255).nullable();
      table.string('premio',45).nullable();
      table.datetime('data_inicio');
      table.datetime('data_fim');
      table.boolean('is_active').defaultTo(false);
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('concursos')
  }
}

module.exports = ConcursoSchema
