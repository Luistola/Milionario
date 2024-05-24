'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const VotacaoRepositorio = use('App/Repositorio/Admin/VotacaoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with votacaos
 */
class VotacaoController {
  constructor(){
    this.votacaoRepositorio = new VotacaoRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all votacaos.
   * GET votacaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosVotacao= await this.votacaoRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Votacao", listarTodosVotacao)
 }

  /**
   * Create/save a new votacao.
   * POST votacaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['concurso_id','participante_id', 'cliente_id', 'voto']);
    await this.votacaoRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Votacao criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVotacao= await this.votacaoRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Votacao', listagemVotacao)

  }

  async showTotalVotosByConcurso({request}){

    const {dados}= request.only(['dados']);
    const listagemVotacao= await this.votacaoRepositorio.listaTotalVotosByConcurso(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Total de Votos por Concurso', listagemVotacao)

  }

  async showByConcurso({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVotacao= await this.votacaoRepositorio.listarByConcurso(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Votacao Agrupado por Participante', listagemVotacao)

  }

  async showByCliente({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVotacao= await this.votacaoRepositorio.listaClienteMaisVotos(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Votacao Agrupado por Cliente', listagemVotacao)

  }

  async delete({ params }) {

      await this.votacaoRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Votacao eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['nome']);
    await this.votacaoRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Votacao Atualizada com sucesso')

  }
}

module.exports = VotacaoController
