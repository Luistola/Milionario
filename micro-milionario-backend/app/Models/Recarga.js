'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Recarga extends Model {
  pagamentos(){
    return this.belongsToMany('App/Models/Pagamento')
  }
}

module.exports = Recarga
