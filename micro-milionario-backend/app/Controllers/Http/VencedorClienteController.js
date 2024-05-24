'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const VencedorClienteRepositorio = use('App/Repositorio/Admin/VencedorClienteRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with vencedorclientes
 */
class VencedorClienteController {
  constructor(){
    this.vencedorClienteRepositorio = new VencedorClienteRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all vencedorclientes.
   * GET vencedorclientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosVencedorCliente= await this.vencedorClienteRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todos os Clientes Vencedor", listarTodosVencedorCliente)
  }

  /**
   * Create/save a new vencedorcliente.
   * POST vencedorclientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['concurso_id', 'cliente_id', 'posicao', 'total_votos', 'premio','data']);
    await this.vencedorClienteRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Vencedor Cliente criado com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedor', listagemVencedorCliente)

  }

  async showByVencedorCliente({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listarVencedorClientes(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedores Clientes', listagemVencedorCliente)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por Id', listagemVencedorCliente)

  }

  async showByUserId({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listarByUserId(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por UserId', listagemVencedorCliente)

  }

  async delete({ params }) {

      await this.vencedorClienteRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Vencedor eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['user_id', 'pontos']);
    await this.vencedorClienteRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Vencedor Atualizada com sucesso')

  }
}

module.exports = VencedorClienteController
