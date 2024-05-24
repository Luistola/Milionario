'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const VencedorRepositorio = use('App/Repositorio/Admin/VencedorRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with vencedors
 */
class VencedorController {
  constructor(){
    this.vencedorRepositorio = new VencedorRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all vencedors.
   * GET vencedors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosVencedor= await this.vencedorRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Vencedor", listarTodosVencedor)
  }

  /**
   * Create/save a new vencedor.
   * POST vencedors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['concurso_id', 'participante_id', 'posicao', 'total_votos', 'premio','data']);
    await this.vencedorRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Vencedor criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedor= await this.vencedorRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedor', listagemVencedor)

  }

  async showByVencedor({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedor= await this.vencedorRepositorio.listarVencedores(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedor', listagemVencedor)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedor= await this.vencedorRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por Id', listagemVencedor)

  }

  async showByUserId({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedor= await this.vencedorRepositorio.listarByUserId(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por UserId', listagemVencedor)

  }

  async delete({ params }) {

      await this.vencedorRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Vencedor eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['user_id', 'pontos']);
    await this.vencedorRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Vencedor Atualizada com sucesso')

  }
}

module.exports = VencedorController
