'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const VencedorRepositorio = use('App/Repositorio/Admin/VencedorRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");
const ConcursoRepositorio = use('App/Repositorio/Admin/ConcursoRepositorio');
const ArtistRepositorio = use('App/Repositorio/Admin/ArtistRepositorio');

const ConcursoModel= use('App/Models/Concurso');



/**
 * Resourceful controller for interacting with vencedors
 */
class VencedorController {
  constructor(){
    this.concursoRepositorio = new ConcursoRepositorio();
    this.vencedorRepositorio = new VencedorRepositorio();
    this.dataResponse = new DataResponse();
    this.artistRepositorio = new ArtistRepositorio();

  }
  /**
   * Show a list of all vencedors.
   * GET vencedors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosVencedor= await this.vencedorRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todas as Vencedor", listarTodosVencedor)
  }

  /**
   * Create/save a new vencedor.
   * POST vencedors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['concurso_id', 'participante_id', 'posicao', 'total_votos', 'premio','data']);
    await this.vencedorRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Vencedor criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedor= await this.vencedorRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedor', listagemVencedor)

  }

  async showByVencedor({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedor= await this.vencedorRepositorio.listarVencedores(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedor', listagemVencedor)

  }

  async getByContestId({params,request}){
    const { pagination, dados } = request.only(["pagination", "dados"]);

    let listagemVencedor = await this.vencedorRepositorio.getByContestId(
      pagination,
      params.id
    );
    console.log("file: VencedorController.js:77 ~ VencedorController ~ getByContestId ~ listagemVencedor:", listagemVencedor)

    let data = await Promise.all(
      listagemVencedor?.data?.map(async (data) => {
        console.log("file: VencedorController.js:81 ~ VencedorController ~ listagemVencedor?.data?.map ~ data:", data)
        let contestData = await this.concursoRepositorio.listarById(
          data.concurso_id
        );
        console.log("file: VencedorController.js:84 ~ VencedorController ~ listagemVencedor?.data?.map ~ contestData:", contestData)
        contestData = contestData[0];

        let artistData = await this.artistRepositorio.listarByUserId(
          data.participante_id
        );
        console.log("file: VencedorController.js:90 ~ VencedorController ~ listagemVencedor?.data?.map ~ artistData:", artistData)
        artistData = artistData[0];

        return {
          vecedor_id: data.id,
          vencedor_concurso_id: data.concurso_id,
          vencedor_participante_id: data.participante_id,
          vencedor_posicao: data.posicao,
          vencedor_total_votos: data.total_votos,
          vencedor_premio: data.premio,
          vencedor_data: data.data,
          concurso_id: contestData.id,
          concurso_nome: contestData.nome,
          concurso_n_vencedor: contestData.n_vencedor,
          participante_id: data.participante_id,
          participante_concurso_id: data.concurso_id,
          artist_id: artistData?.id,
          artist_user_id: data.participante_id,
          artist_nome: artistData?.nome,
          artist_foto: artistData?.foto,
        };
      })
    );

    listagemVencedor = {
      ...listagemVencedor,
      data,
    };

    return this.dataResponse.dataReponse(
      200,
      "Listagem de Vencedor",
      listagemVencedor
    );

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedor= await this.vencedorRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por Id', listagemVencedor)

  }

  async showByUserId({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedor= await this.vencedorRepositorio.listarByUserId(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por UserId', listagemVencedor)

  }

  async delete({ params }) {

      await this.vencedorRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Vencedor eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['user_id', 'pontos']);
    await this.vencedorRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Vencedor Atualizada com sucesso')

  }

  async getLatestVencedor({ request }) {
 
    let lastFiveConcurso = await ConcursoModel.query()
      .where("is_winner_generated", true)
      .orderBy("created_at", "desc")
      .limit(10)
      .fetch();

    lastFiveConcurso = await lastFiveConcurso.toJSON();

    for (const contest of lastFiveConcurso) {
     
      let winners = await this.vencedorRepositorio.getAllByContestId(
        contest.id
      );

      if (winners && winners.length){
        winners = winners.map(d=>({...d, contest_name: contest.nome}))
        return this.dataResponse.dataReponse(200, "latest vencedor", winners);
      }
    }

    return this.dataResponse.dataReponse(200, "latest vencedor", []);

  }

}

module.exports = VencedorController
