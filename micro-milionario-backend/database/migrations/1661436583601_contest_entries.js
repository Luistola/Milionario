'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContestEntSchema extends Schema {
  up() {
    this.create('contest_entries', (table) => {
      table.increments()
      table.string('title', 50).notNullable()
      table.string('description', 80).notNullable()
      table.string('artist_id', 50).notNullable()
      table.string('link', 50).notNullable()
      table.string('link_type', 50).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('contest_entries')
  }
}

module.exports = ContestEntSchema
