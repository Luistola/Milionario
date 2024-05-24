'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const RolesRepositorio = use('App/Repositorio/Admin/RolesRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  constructor(){
    this.rolesRepositorio = new RolesRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all roles.
   * GET roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const listarTodosRoles= await this.rolesRepositorio.index();
     return this.dataResponse.dataReponse(200, "listagem de todas as roles", listarTodosRoles)
  }

  /**
   * Create/save a new role.
   * POST roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const {...dados}= request.only(['nome']);
    await this.rolesRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Roles criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemRoles= await this.rolesRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Roles', listagemRoles)

  }
  async delete({ params }) {

      await this.rolesRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Roles eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['nome']);
    await this.rolesRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Roles Atualizada com sucesso')

  }

}

module.exports = RoleController
