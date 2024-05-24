'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const AlbumRepositorio = use('App/Repositorio/Admin/AlbumRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with albums
 */
class AlbumController {
  constructor(){
    this.albumRepositorio = new AlbumRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all albums.
   * GET albums
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosAlbum= await this.albumRepositorio.index();
     return this.dataResponse.dataReponse(200, "listagem de todas as Albuns", listarTodosAlbum)
  }

  /**
   * Create/save a new album.
   * POST albums
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['artist_id','nome','descricao','produtor','lancamento','data_lancamento','foto']);
    await this.albumRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Album criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemAlbum= await this.albumRepositorio.listarWithArtist(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Album', listagemAlbum)

  }

  async showByArtist({request}){

    const {dados}= request.only(['dados']);
    const listagemArtist= await this.albumRepositorio.listarByArtist(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Album por Artista', listagemArtist)

  }

  async delete({ params }) {

      await this.albumRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Music eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['nome']);
    await this.albumRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Music Atualizada com sucesso')

  }
}

module.exports = AlbumController
