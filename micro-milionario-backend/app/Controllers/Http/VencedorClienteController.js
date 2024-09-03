'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const VencedorClienteRepositorio = use('App/Repositorio/Admin/VencedorClienteRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");
const ClienteRepositorio = use('App/Repositorio/Admin/ClienteRepositorio');
const ConcursoRepositorio = use('App/Repositorio/Admin/ConcursoRepositorio');

const ConcursoModel= use('App/Models/Concurso');
const VencedorClienteModel= use('App/Models/VencedorCliente');


/**
 * Resourceful controller for interacting with vencedorclientes
 */
class VencedorClienteController {
  constructor(){
    this.vencedorClienteRepositorio = new VencedorClienteRepositorio();
    this.dataResponse = new DataResponse();
    this.clienteRepositorio = new ClienteRepositorio();
    this.concursoRepositorio = new ConcursoRepositorio();

  }
  /**
   * Show a list of all vencedorclientes.
   * GET vencedorclientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index () {
    const listarTodosVencedorCliente= await this.vencedorClienteRepositorio.index();
    return this.dataResponse.dataReponse(200, "listagem de todos os Clientes Vencedor", listarTodosVencedorCliente)
  }

  /**
   * Create/save a new vencedorcliente.
   * POST vencedorclientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request }) {
    const {...dados}= request.only(['concurso_id', 'cliente_id', 'posicao', 'total_votos', 'premio','data']);
    await this.vencedorClienteRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Vencedor Cliente criado com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedor', listagemVencedorCliente)

  }

  async showByVencedorCliente({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listarVencedorClientes(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedores Clientes', listagemVencedorCliente)

  }

  async showById({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listarById(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por Id', listagemVencedorCliente)

  }

  async showByUserId({request}){

    const {dados}= request.only(['dados']);
    const listagemVencedorCliente= await this.vencedorClienteRepositorio.listarByUserId(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Vencedora por UserId', listagemVencedorCliente)

  }

  async delete({ params }) {

      await this.vencedorClienteRepositorio.eliminar(params.id);
      return this.dataResponse.dataReponse(200, ' Vencedor eliminada com sucesso')

  }
  async update({ params, request }) {

    const {...dados}= request.only(['user_id', 'pontos']);
    await this.vencedorClienteRepositorio.atualizar(dados, params.id, request.url())
    return this.dataResponse.dataReponse(200, ' Vencedor Atualizada com sucesso')

  }

  async getByContestId({params,request}){
    try {
    const { pagination, dados } = request.only(["pagination", "dados"]);

    let listagemVencedor = await this.vencedorClienteRepositorio.getByContestId(
      pagination,
      params.id
    );

    let arr = [];

    for (let data of listagemVencedor?.data) {
      let contestData = await this.concursoRepositorio.listarById(
        data.concurso_id
      );
      contestData = contestData[0];

      let clientData = await this.clienteRepositorio.listarById(
        data.cliente_id
      );
      clientData = clientData[0];

      arr.push({
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
        client_id: clientData.id,
        client_user_id: data.participante_id,
        client_nome: clientData.nome,
        client_foto: clientData.foto,
        data_inicio: data.data_inicio,
        data_fim: data.data_fim,
      });
    }

    listagemVencedor = {
      ...listagemVencedor,
      data: arr,
    };

    return this.dataResponse.dataReponse(
      200,
      "Listagem de Vencedor Cliente",
      listagemVencedor
    );
  } catch (error) {
      console.log("file: VencedorClienteController.js:157 ~ VencedorClienteController ~ getByContestId ~ error:", error)
  }

  }

  async getLatestVencedor({ request }) {
 
    let lastFiveConcurso = await ConcursoModel.query()
      .where("is_winner_generated", true)
      .orderBy("created_at", "desc")
      .limit(10)
      .fetch();

    lastFiveConcurso = await lastFiveConcurso.toJSON();

    for (const contest of lastFiveConcurso) {
     
      let winners = await VencedorClienteModel.query()
      .where('concurso_id', contest.id)
      .innerJoin('concursos', 'vencedor_clientes.concurso_id', 'concursos.id')
      .innerJoin('users', 'vencedor_clientes.cliente_id', 'users.id')
      .innerJoin('roles', 'users.role_id', 'roles.id')
      .select("vencedor_clientes.*",
        "concursos.*",
        "roles.nome as role_name")
      .fetch();
      
      winners = await winners.toJSON();

      if (winners && winners.length){

        return this.dataResponse.dataReponse(200, "latest vencedor cliente", winners);
      }
    }

    return this.dataResponse.dataReponse(200, "latest vencedor cliente", []);
  }
}

module.exports = VencedorClienteController
