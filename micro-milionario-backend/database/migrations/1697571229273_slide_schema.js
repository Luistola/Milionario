'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlideSchema extends Schema {
  up () {
    this.create('slides', (table) => {
      table.increments()
      table.string('foto',255).nullable();
      table.boolean('is_active').defaultTo(false);
      table.boolean('is_delete').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('slides')
  }
}

module.exports = SlideSchema
