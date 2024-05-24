'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle ({response}) {
   
     return response.status(401).json({message: "usuario não encontrado"})
   }
}

module.exports = UserNotFoundException