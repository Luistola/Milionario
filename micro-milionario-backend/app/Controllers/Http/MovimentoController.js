'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const MovimentoRepositorio = use('App/Repositorio/Admin/MovimentoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with movimentos
 */
class MovimentoController {
  constructor(){
    this.movimentoRepositorio = new MovimentoRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all movimentos.
   * GET movimentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosMovimento= await this.movimentoRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Movimento", listarTodosMovimento)
 }

  /**
   * Create/save a new movimento.
   * POST movimentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['carteira_id', 'pontos', 'valor_unitel_m', 'tipo']);
    await this.movimentoRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Movimento criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemMovimento= await this.movimentoRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Movimento', listagemMovimento)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemMovimento= await this.movimentoRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Movimentoa por Id', listagemMovimento)

  }

  async showByUserId({request}){

    const {dados}= request.only(['dados']);
    const listagemMovimento= await this.movimentoRepositorio.listarByUserId(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Movimentoa por UserId', listagemMovimento)

  }

  async delete({ params }) {

      await this.movimentoRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Movimento eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['user_id', 'pontos']);
    await this.movimentoRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Movimento Atualizada com sucesso')

  }
}

module.exports = MovimentoController
