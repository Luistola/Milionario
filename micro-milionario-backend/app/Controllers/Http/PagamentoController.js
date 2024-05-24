'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const PagamentoRepositorio = use('App/Repositorio/Admin/PagamentoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

const paymentDTO = ['user_id', 'valor_pagar', 'valor_entregue', 'troco']

/**
 * Resourceful controller for interacting with pagamentos
 */
class PagamentoController {
  constructor() {
    this.pagamentoRepositorio = new PagamentoRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all pagamentos.
   * GET pagamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const listarTodosPagamento = await this.pagamentoRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Pagamento", listarTodosPagamento)
  }

  /**
   * Create/save a new pagamento.
   * POST pagamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const { ...dados } = request.only(paymentDTO);
    await this.pagamentoRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Pagamento criada com sucesso");
  }

  async show({ request }) {

    const { pagination, dados } = request.only(['pagination', 'dados']);
    const listagemPagamento = await this.pagamentoRepositorio.listar(pagination, dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Pagamento', listagemPagamento)

  }

  async showByConcurso({ request }) {

    const { pagination, dados } = request.only(['pagination', 'dados']);
    const listagemPagamento = await this.pagamentoRepositorio.listarByConcurso(pagination, dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Pagamento', listagemPagamento)

  }

  async showLastId() {

    // const {dados}= request.only(['dados']);
    const listagemPagamento = await this.pagamentoRepositorio.listarLastId();
    return this.dataResponse.dataReponse(200, 'Listagem do LastId do Pagamento', listagemPagamento)

  }

  async delete({ params }) {

    await this.pagamentoRepositorio.eliminar(params.id);
    return this.dataResponse.dataReponse(200, ' Pagamento eliminada com sucesso')

  }
  async update({ params, request }) {

    const { ...dados } = request.only(['nome']);
    await this.pagamentoRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Pagamento Atualizada com sucesso')

  }
}

module.exports = PagamentoController
