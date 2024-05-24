'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ItemNaoActivoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (message,{response}) {
     return response.status(401).json({message:'Item  encontra-se  desabilidado'})
   }
}

module.exports = ItemNaoActivoException
