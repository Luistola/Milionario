'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ClienteRepositorio = use('App/Repositorio/Admin/ClienteRepositorio');
const UserRepositorio = use('App/Repositorio/Admin/UserRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");
const UserModel = use('App/Models/User')

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  constructor() {
    this.clienteRepositorio = new ClienteRepositorio();
    this.userRepositorio = new UserRepositorio();
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
  async index() {
    const listarTodosCliente = await this.clienteRepositorio.index();
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
  async showQtdCliente() {
    const listarQtdCliente = await this.clienteRepositorio.todosClientes();
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
  async store({ request }) {
    const { ...dados } = request.only(['user_id', 'nome', 'sexo', 'telefone', 'foto']);
    await this.clienteRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Cliente criada com sucesso");
  }

  async show({ request }) {

    const { pagination, dados } = request.only(['pagination', 'dados']);
    const listagemCliente = await this.clienteRepositorio.listar(pagination, dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Cliente', listagemCliente)

  }

  async showByUser({ request }) {

    const { dados } = request.only(['dados']);
    let listagemCliente = await this.clienteRepositorio.listarByUser(dados);

    if (listagemCliente && listagemCliente?.length) {
      listagemCliente = await Promise.all(listagemCliente.map(async client => {

        let clientData = await this.userRepositorio.getUserById(client.user_id);

        return ({ ...client, email: clientData.email })
      }))
    } else {
      let clientData = await this.userRepositorio.getUserById(listagemCliente.user_id);
      listagemCliente = { ...listagemCliente, email: clientData.email }
    }

    return this.dataResponse.dataReponse(200, 'Listagem de Cliente por User', listagemCliente)

  }

  async delete({ params }) {

    await this.clienteRepositorio.eliminar(params.id);
    return this.dataResponse.dataReponse(200, ' Cliente eliminada com sucesso')

  }

  async update({ params, request }) {

    const { nome, sexo, telefone, email, foto } = request.only(['nome', 'sexo', 'telefone', 'email', 'foto']);

    if (!nome || !sexo || !telefone || !email || !foto) {
      return this.dataResponse.dataReponse(500, 'Todos os campos são necessários')
    }

    let client = await this.clienteRepositorio.getClientByUserId(params.id)

    if (client) {
      client = await client.toJSON()

      let user = await UserModel.query().where('email', email).first();
      
      if(user && user.id != params.id){
        return this.dataResponse.dataReponse(500, 'Email exists')
      }

      let updated = await this.clienteRepositorio.updateById(client.id, { nome, sexo, telefone, foto })
      if(updated)
        updated = updated.toJSON();
      
      let updatedUser = await UserModel.query().where('id', params.id).update({ email });

      return this.dataResponse.dataReponse(200, 'Cliente Atualizada com sucesso', {...updated, email})
    }

    return this.dataResponse.dataReponse(200, 'Client not found')


  }

  async getClientById({ params }) {

    let data = await this.clienteRepositorio.getClientByUserId(params.id)

    if(data){
      data = await data.toJSON();
      let user = await UserModel.query().where('id', data.user_id).first();
      user = await user.toJSON()

      return this.dataResponse.dataReponse(200, 'El cliente llega con éxito.', {...data, email: user.email})
    }

    return this.dataResponse.dataReponse(400, 'Not found.')

  }

  async search({request}) {
    // const queryParams = request.get(); // to get all query param
    // const inputName = request.input("name");

    const { pagination, name:inputName } = request.only(['pagination', 'name']);
    
    const listagemConcurso = await this.clienteRepositorio.searchWithName(inputName, pagination);
    
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso', listagemConcurso)
  }
}

module.exports = ClienteController
