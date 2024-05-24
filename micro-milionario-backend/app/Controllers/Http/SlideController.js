'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const SlideRepositorio = use('App/Repositorio/Admin/SlideRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with slides
 */
class SlideController {
  constructor(){
    this.slideRepositorio = new SlideRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all slides.
   * GET slides
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosSlide= await this.slideRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas os Slides", listarTodosSlide)
 }

  /**
   * Create/save a new slide.
   * POST slides
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['foto']);
    await this.slideRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Slide criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemSlide= await this.slideRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Slide', listagemSlide)

  }

  async showByUser({request}){

    const {dados}= request.only(['dados']);
    const listagemSlide= await this.slideRepositorio.listarByUser(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Slide por User', listagemSlide)

  }

  async delete({ params }) {

      await this.slideRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Slide eliminada com sucesso')

  }

  async update({ params, request }) {

    const {...dados}= request.only(['foto']);
    await this.slideRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Slide Atualizada com sucesso')

  }
}

module.exports = SlideController
