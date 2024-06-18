'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ConcursoRepositorio = use('App/Repositorio/Admin/ConcursoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with concursos
 */
class ConcursoController {
  constructor(){
    this.concursoRepositorio = new ConcursoRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all concursos.
   * GET concursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosConcurso= await this.concursoRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Concurso", listarTodosConcurso)
 }

 /**
   * Show a list of all concursos.
   * GET concursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexActive () {
    const listarTodosConcurso= await this.concursoRepositorio.indexActive();
    return this.dataResponse.dataReponse(200, "listagem de todos os Concurso activos", listarTodosConcurso)
 }

 /**
   * Show a list of all concursos.
   * GET concursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexPure () {
    const listarTodosConcurso= await this.concursoRepositorio.indexPure();
    return this.dataResponse.dataReponse(200, "listagem de todos os Concurso activos e validos", listarTodosConcurso)
 }

 /**
   * Show a list of all concursos.
   * GET concursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showQtdConcurso () {
    const listarQtdConcurso= await this.concursoRepositorio.todosConcursos();
    return this.dataResponse.dataReponse(200, "listagem de qtd de Concursos cadastrados", listarQtdConcurso)
 }


  /**
   * Create/save a new concurso.
   * POST concursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
     const { ...dados } = request.only(['nome', 'descricao', 'foto', 'premio', 'n_vencedor', 'data_inicio', 'data_fim', 'price_percent']);
    await this.concursoRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Concurso criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemConcurso= await this.concursoRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso', listagemConcurso)

  }

  async showAlt({request}){

    const {dados}= request.only(['dados']);
    const listagemConcurso= await this.concursoRepositorio.listaAlt(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso', listagemConcurso)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemConcurso= await this.concursoRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso por Id', listagemConcurso)

  }

  async showByDataFim({request}){

    const {dados}= request.only(['dados']);
    const listagemConcurso= await this.concursoRepositorio.listarByDataFim(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso por Data Fim', listagemConcurso)

  }

  async delete({ params }) {

      await this.concursoRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Concurso eliminada com sucesso')

  }
  async update({ params, request }) {

    const { ...dados } = request.only(['nome', 'descricao', 'foto', 'premio', 'n_vencedor', 'data_inicio', 'data_fim', 'is_active', 'price_percent']);
    await this.concursoRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Concurso Atualizada com sucesso')

  }
}

module.exports = ConcursoController
