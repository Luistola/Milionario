'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
//const logger= use('logger')
class NotCreatedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (errr, {response, request}) {
    //logger.errorLog({message:'Item Já existe na bd', urls:request.url()})
    return response.status(409).send({message:'Item ja cadastrado verifica os campos', code: 409})

  }
}

module.exports = NotCreatedException
