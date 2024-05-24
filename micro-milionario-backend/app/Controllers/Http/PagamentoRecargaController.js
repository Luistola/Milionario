'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const PagamentoRecargaRepositorio = use('App/Repositorio/Admin/PagamentoRecargaRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with pagamentorecargas
 */
class PagamentoRecargaController {
  constructor(){
    this.pagamentoRecargaRepositorio = new PagamentoRecargaRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all pagamentorecargas.
   * GET pagamentorecargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosPagamentoRecarga= await this.pagamentoRecargaRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as PagamentoRecarga", listarTodosPagamentoRecarga)
 }

  /**
   * Create/save a new pagamentorecarga.
   * POST pagamentorecargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['pagamento_id', 'recarga_id', 'preco_unitario', 'qtd', 'total_recarga']);
    await this.pagamentoRecargaRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "PagamentoRecarga criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemPagamentoRecarga= await this.pagamentoRecargaRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de PagamentoRecarga', listagemPagamentoRecarga)

  }

  async showByConcurso({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemPagamentoRecarga= await this.pagamentoRecargaRepositorio.listarByConcurso(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de PagamentoRecarga', listagemPagamentoRecarga)

  }

  async delete({ params }) {

      await this.pagamentoRecargaRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' PagamentoRecarga eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['nome']);
    await this.pagamentoRecargaRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' PagamentoRecarga Atualizada com sucesso')

  }
}

module.exports = PagamentoRecargaController
