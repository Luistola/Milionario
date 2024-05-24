'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ParametroRepositorio = use('App/Repositorio/Admin/ParametroRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with parametros
 */
class ParametroController {
  constructor(){
    this.parametroRepositorio = new ParametroRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all parametros.
   * GET parametros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosParametro= await this.parametroRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Parametro", listarTodosParametro)
 }

  /**
   * Create/save a new parametro.
   * POST parametros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['nome', 'valor']);
    await this.parametroRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Parametro criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemParametro= await this.parametroRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Parametro', listagemParametro)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemParametro= await this.parametroRepositorio.listarById(dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Parametro por Id', listagemParametro)

  }

  async delete({ params }) {

      await this.parametroRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Parametro eliminada com sucesso')

  }

  async update({ params, request }) {

    const {...dados}= request.only(['nome', 'valor']);
    await this.parametroRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Parametro Atualizada com sucesso')

  }
}

module.exports = ParametroController
