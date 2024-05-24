'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtistSchema extends Schema {
  up () {
    this.create('artists', (table) => {
      table.increments();
      table.integer('user_id')
      	.unsigned()
      	.references('id')
      	.inTable('users');
      table.string('nome',45).nullable();
      table.string('foto',255).nullable();
      table.string('sexo',45).nullable();
      table.string('telefone',45).nullable();
      table.string('facebook',45).nullable();
      table.string('instagram',45).nullable();
      table.string('twitter',45).nullable();
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('artists')
  }
}

module.exports = ArtistSchema
