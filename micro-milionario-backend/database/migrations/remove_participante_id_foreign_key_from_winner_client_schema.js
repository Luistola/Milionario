'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveParticipanteIdForeignKeyFromSchema extends Schema {
  up () {
    this.table('vencedor_clientes', (table) => {
      // Drop foreign key constraint
      // table.dropForeign('participante_id')
      
      // Optional: If you want to drop the participante_id column as well, uncomment the following line
      // table.dropColumn('participante_id')
    })
  }

  down () {
    this.table('vencedor_clientes', (table) => {
      // Re-add the foreign key constraint
      table.integer('participante_id')
        .unsigned()
        .references('id')
        .inTable('participantes');

      // Optional: If you dropped the participante_id column in the up() method, re-add it here
      // table.integer('participante_id')
      //   .unsigned()
      //   .references('id')
      //   .inTable('participantes');
    })
  }
}

module.exports = RemoveParticipanteIdForeignKeyFromSchema
