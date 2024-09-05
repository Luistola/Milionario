'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveUsernameUniqueFromUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // Remove the unique constraint from the 'username' field
      table.dropUnique('username')
    })
  }

  down () {
    this.table('users', (table) => {
      // Reapply the unique constraint to the 'username' field in case of rollback
      table.unique('username')
    })
  }
}

module.exports = RemoveUsernameUniqueFromUsersSchema
