'use strict'
//const logger= use('logger')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error, {response, request}) {
      //logger.infoLog({message:'Item não encontrado', urls:request.url()})
      response.status(404).send({message: 'item não encontrado', code: 404})
  
   }
}

module.exports = NotFoundException
