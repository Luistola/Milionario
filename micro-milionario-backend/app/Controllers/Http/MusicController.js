'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const MusicRepositorio = use('App/Repositorio/Admin/MusicRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with music
 */
class MusicController {
  constructor(){
    this.musicRepositorio = new MusicRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all music.
   * GET music
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosMusic= await this.musicRepositorio.index();
     return this.dataResponse.dataReponse(200, "listagem de todas as Music", listarTodosMusic)
  }

  /**
   * Create/save a new music.
   * POST music
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const {...dados}= request.only(['artist_id', 'album_id', 'titulo', 'duracao', 'genero', 'foto', 'url_musica', 'url_video']);
    await this.musicRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Music criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemMusic= await this.musicRepositorio.listarWithArtist(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Music', listagemMusic)

  }

  async showByArtist({request}){

    const {dados}= request.only(['dados']);
    const listagemArtist= await this.musicRepositorio.listarByArtist(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Musica por Artista', listagemArtist)

  }

  async delete({ params }) {

      await this.musicRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Music eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['nome']);
    await this.musicRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Music Atualizada com sucesso')

  }
}

module.exports = MusicController
