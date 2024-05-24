'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ParticipanteRepositorio = use('App/Repositorio/Admin/ParticipanteRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with participantes
 */
class ParticipanteController {
  constructor(){
    this.participanteRepositorio = new ParticipanteRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all participantes.
   * GET participantes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosParticipante= await this.participanteRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Participante", listarTodosParticipante)
 }

  /**
   * Create/save a new participante.
   * POST participantes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['concurso_id', 'artist_id']);
    await this.participanteRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Participante criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemParticipante= await this.participanteRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Participante', listagemParticipante)

  }

  async showByConcurso({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemParticipante= await this.participanteRepositorio.listarByConcurso(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Participante', listagemParticipante)

  }

  async delete({ params }) {

      await this.participanteRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Participante eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['nome']);
    await this.participanteRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Participante Atualizada com sucesso')

  }
}

module.exports = ParticipanteController
