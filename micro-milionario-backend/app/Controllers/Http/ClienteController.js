'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ClienteRepositorio = use('App/Repositorio/Admin/ClienteRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  constructor(){
    this.clienteRepositorio = new ClienteRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosCliente= await this.clienteRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Cliente", listarTodosCliente)
 }

 /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showQtdCliente () {
    const listarQtdCliente= await this.clienteRepositorio.todosClientes();
    return this.dataResponse.dataReponse(200, "listagem de qtd de Clientes cadastrados", listarQtdCliente)
 }

  /**
   * Create/save a new cliente.
   * POST clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['user_id', 'nome', 'sexo', 'telefone']);
    await this.clienteRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Cliente criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemCliente= await this.clienteRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Cliente', listagemCliente)

  }

  async showByUser({request}){

    const {dados}= request.only(['dados']);
    const listagemCliente= await this.clienteRepositorio.listarByUser(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Cliente por User', listagemCliente)

  }

  async delete({ params }) {

      await this.clienteRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Cliente eliminada com sucesso')

  }

  async update({ params, request }) {

    const {...dados}= request.only(['nome', 'sexo', 'telefone']);
    await this.clienteRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Cliente Atualizada com sucesso')

  }
}

module.exports = ClienteController
