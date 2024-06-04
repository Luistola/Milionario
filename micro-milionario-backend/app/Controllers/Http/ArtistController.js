'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ArtistRepositorio = use('App/Repositorio/Admin/ArtistRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with artists
 */
class ArtistController {
  constructor() {
    this.artistRepositorio = new ArtistRepositorio();
    this.dataResponse = new DataResponse();
  }
  /**
   * Show a list of all artists.
   * GET artists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const listarTodosArtist = await this.artistRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Artist", listarTodosArtist)
  }

  /**
   * Show a list of all artists.
   * GET artists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showQtdArtista() {
    const listarQtdArtista = await this.artistRepositorio.todosArtistas();
    return this.dataResponse.dataReponse(200, "listagem de qtd de Artistas cadastrados", listarQtdArtista)
  }

  /**
   * Create/save a new artist.
   * POST artists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const { ...dados } = request.only(['user_id', 'nome', 'sexo', 'telefone', 'foto', 'facebook', 'instagram', 'twitter']);
    await this.artistRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Artist criada com sucesso");
  }

  async show({ request }) {

    const { pagination, dados } = request.only(['pagination', 'dados']);
    const listagemArtist = await this.artistRepositorio.listar(pagination, dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Artist', listagemArtist)

  }

  async showById({ request }) {

    const { dados } = request.only(['dados']);
    const listagemArtist = await this.artistRepositorio.listarById(dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Artista por Id', listagemArtist)

  }

  async showByUserId({ request }) {

    const { dados } = request.only(['dados']);
    const listagemArtist = await this.artistRepositorio.listarByUserId(dados);
    return this.dataResponse.dataReponse(200, 'Listagem de Artista por UserId', listagemArtist)

  }

  async delete({ params }) {

    await this.artistRepositorio.eliminar(params.id);
    return this.dataResponse.dataReponse(200, ' Artista eliminado com sucesso')

  }
  async update({ params, request }) {

    const { ...dados } = request.only(['nome']);
    await this.artistRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Artist Atualizada com sucesso')

  }

  async getArtistById({ params }) {

    const data = await this.artistRepositorio.getArtistByUserId(params.id)
    return this.dataResponse.dataReponse(200, 'El artista llega con éxito.', data)

  }
}

module.exports = ArtistController
