'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveParticipanteIdForeignKeyFromVotacaosSchema extends Schema {
  up () {
    this.table('votacaos', (table) => {
      // Drop foreign key constraint
      table.dropForeign('participante_id')
      
      // Optional: If you want to drop the participante_id column as well, uncomment the following line
      // table.dropColumn('participante_id')
    })
  }

  down () {
    this.table('votacaos', (table) => {
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

module.exports = RemoveParticipanteIdForeignKeyFromVotacaosSchema
