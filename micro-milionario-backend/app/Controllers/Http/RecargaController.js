'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const RecargaRepositorio = use('App/Repositorio/Admin/RecargaRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

const recargaDTO = ['nome', 'preco', 'tipo', 'quantidade', 'foto', 'referencia']

/**
 * Resourceful controller for interacting with recargas
 */
class RecargaController {
  constructor() {
    this.recargaRepositorio = new RecargaRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all recargas.
   * GET recargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const listarTodosRecarga = await this.recargaRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Recarga", listarTodosRecarga)
  }

  /**
   * Create/save a new recarga.
   * POST recargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const { ...dados } = request.only(recargaDTO);
    await this.recargaRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Recarga efectuada com sucesso!")
  }

  async show({ request }) {

    const { pagination, dados } = request.only(['pagination', 'dados']);
    const listagemRecarga = await this.recargaRepositorio.listar(pagination, dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Recarga', listagemRecarga)

  }
  async delete({ params }) {

    await this.recargaRepositorio.eliminar(params.id);
    return this.dataResponse.dataReponse(200, ' Recarga eliminada com sucesso')

  }
  async update({ params, request }) {

    const { ...dados } = request.only(['nome']);
    await this.recargaRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Recarga Atualizada com sucesso')

  }
}

module.exports = RecargaController
