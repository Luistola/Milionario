'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParticipanteSchema extends Schema {
  up () {
    this.create('participantes', (table) => {
      table.increments()
      table.integer('concurso_id')
      	.unsigned()
      	.references('id')
      	.inTable('concursos');
      table.integer('artist_id')
      	.unsigned()
      	.references('id')
      	.inTable('artists');
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('participantes')
  }
}

module.exports = ParticipanteSchema
