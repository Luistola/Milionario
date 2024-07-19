"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PricePercentFieldToContest extends Schema {
  up() {
    this.table("votacaos", (table) => {
      // alter table
      table.integer("contest_entry_id");
    });
  }

  down() {
    this.table("votacaos", (table) => {
      // reverse alternations
      table.integer("contest_entry_id");
    });
  }
}

module.exports = PricePercentFieldToContest;
