'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PagamentoRecarga extends Model {
  static get table () {
    return 'pagamento_recarga'
}
}

module.exports = PagamentoRecarga
