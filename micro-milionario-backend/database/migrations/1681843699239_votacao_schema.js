'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VotacaoSchema extends Schema {
  up () {
    this.create('votacaos', (table) => {
      table.increments()
      table.integer('concurso_id')
      	.unsigned()
      	.references('id')
      	.inTable('concursos');
      table.integer('participante_id')
      	.unsigned()
      	.references('id')
      	.inTable('participantes');
        table.integer('cliente_id')
      	.unsigned()
      	.references('id')
      	.inTable('clientes');
      table.integer('voto').defaultTo(0);
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('votacaos')
  }
}

module.exports = VotacaoSchema
