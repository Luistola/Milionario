'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LandingPageSchema extends Schema {
  up() {
    this.create('landing_pages', (table) => {
      table.increments()
      table.string('title', 50).notNullable()
      table.string('description', 80).notNullable()
      table.string('file', 50).notNullable()
      table.string('type', 50).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('landing_pages')
  }
}

module.exports = LandingPageSchema
