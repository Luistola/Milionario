'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VencedorClienteSchema extends Schema {
  up () {
    this.create('vencedor_clientes', (table) => {
      table.increments()
      table.integer('concurso_id')
      	.unsigned()
      	.references('id')
      	.inTable('concursos');
      table.integer('cliente_id')
      	.unsigned()
      	.references('id')
      	.inTable('clientes');
      table.integer('posicao').defaultTo(0);
      table.integer('total_votos').defaultTo(0);
      table.integer('premio').defaultTo(0);
      table.date('data');
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('vencedor_clientes')
  }
}

module.exports = VencedorClienteSchema
