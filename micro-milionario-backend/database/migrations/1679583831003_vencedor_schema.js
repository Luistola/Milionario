'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VencedorSchema extends Schema {
  up () {
    this.create('vencedors', (table) => {
      table.increments()
      table.integer('concurso_id')
      	.unsigned()
      	.references('id')
      	.inTable('concursos');
      table.integer('participante_id')
      	.unsigned()
      	.references('id')
      	.inTable('participantes');
      table.integer('posicao').defaultTo(0);
      table.integer('total_votos').defaultTo(0);
      table.integer('premio').defaultTo(0);
      table.date('data');
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('vencedors')
  }
}

module.exports = VencedorSchema
