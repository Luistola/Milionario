'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ContactoRepositorio = use('App/Repositorio/Admin/ContactoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with contactos
 */
class ContactoController {
  constructor(){
    this.contactoRepositorio = new ContactoRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all contactos.
   * GET contactos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosContacto= await this.contactoRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Contactos", listarTodosContacto)
 }

  /**
   * Create/save a new contacto.
   * POST contactos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['nome', 'email', 'descricao']);
    await this.contactoRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Contacto criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemContacto= await this.contactoRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Contacto', listagemContacto)

  }

  async showByUser({request}){

    const {dados}= request.only(['dados']);
    const listagemContacto= await this.contactoRepositorio.listarByUser(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Contacto por User', listagemContacto)

  }

  async delete({ params }) {

      await this.contactoRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Contacto eliminada com sucesso')

  }

  async update({ params, request }) {

    const {...dados}= request.only(['nome', 'email', 'descricao']);
    await this.contactoRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Contacto Atualizada com sucesso')

  }
}

module.exports = ContactoController
