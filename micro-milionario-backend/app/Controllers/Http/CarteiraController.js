'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CarteiraRepositorio = use('App/Repositorio/Admin/CarteiraRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");
/**
 * Resourceful controller for interacting with carteiras
 */
class CarteiraController {
  constructor(){
    this.carteiraRepositorio = new CarteiraRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all carteiras.
   * GET carteiras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosCarteira= await this.carteiraRepositorio.index();
        return this.dataResponse.dataReponse(200, "listagem de todas as Carteira", listarTodosCarteira)
 }

  /**
   * Create/save a new carteira.
   * POST carteiras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['user_id', 'pontos']);
    await this.carteiraRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Carteira criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemCarteira= await this.carteiraRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Carteira', listagemCarteira)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemCarteira= await this.carteiraRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Carteiraa por Id', listagemCarteira)

  }

  async showByUserId({request}){

    const {dados}= request.only(['dados']);
    const listagemCarteira= await this.carteiraRepositorio.listarByUserId(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Carteiraa por UserId', listagemCarteira)

  }

  async delete({ params }) {

      await this.carteiraRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Carteira eliminada com sucesso')

  }

  async update({ params, request }) {

    let {...dados}= request.only(['user_id', 'pontos']);

    let existingData = await this.carteiraRepositorio.listarByUserId(dados.user_id);

    existingData = existingData[0];
    
    dados.pontos = existingData.pontos + dados.pontos;
    dados.valor_unitel_m = dados.pontos;

    let updatedData = await this.carteiraRepositorio.atualizar({...existingData,...dados}, existingData.id)
      
    return this.dataResponse.dataReponse(200, ' Carteira Atualizada com sucesso', updatedData)

  }
}

module.exports = CarteiraController
