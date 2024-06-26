"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContestEntSchema extends Schema {
  up() {
    this.create("contest_entries", (table) => {
      table.increments();
      table.string("title", 256).nullable();
      table.string("description", 512).nullable();
      table.string("contest_id", 256).nullable();
      table.string("artist_id", 256).nullable();
      table.string("link", 256).nullable();
      table.string("link_type", 256).nullable();
      table.boolean("status").defaultTo(true);
      table.integer("vote");
      table.timestamps();
    });
  }

  down() {
    this.drop("contest_entries");
  }
}

module.exports = ContestEntSchema;
