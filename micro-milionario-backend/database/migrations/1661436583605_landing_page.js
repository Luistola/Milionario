'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LandingPageSchema extends Schema {
  up() {
    this.create('landing_pages', (table) => {
      table.increments()
      table.string('title', 256).nullable()
      table.string('description', 512).nullable()
      table.string('file', 256).nullable()
      table.string('type', 256).nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('landing_pages')
  }
}

module.exports = LandingPageSchema
