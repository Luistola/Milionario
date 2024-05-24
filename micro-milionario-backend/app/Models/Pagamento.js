'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pagamento extends Model {
  recargas(){
    return this.belongsToMany('App/Models/Recarga')
  }
}

module.exports = Pagamento
