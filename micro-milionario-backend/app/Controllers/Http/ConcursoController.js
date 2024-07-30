'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ConcursoRepositorio = use('App/Repositorio/Admin/ConcursoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

const ContestEntryRepositorio = use("App/Repositorio/Admin/ContestEntryRepositorio");
const VotacaoRepositorio = use('App/Repositorio/Admin/VotacaoRepositorio');
const VencedorRepositorio = use('App/Repositorio/Admin/VencedorRepositorio');
const VencedorClienteRepositorio = use('App/Repositorio/Admin/VencedorClienteRepositorio');



/**
 * Resourceful controller for interacting with concursos
 */
class ConcursoController {
  constructor(){
    this.concursoRepositorio = new ConcursoRepositorio();
    this.dataResponse = new DataResponse();
    this.contestEntryRepositorio = new ContestEntryRepositorio();
    this.votacaoRepositorio = new VotacaoRepositorio();
    this.vencedorRepositorio = new VencedorRepositorio();
    this.vencedorClienteRepositorio = new VencedorClienteRepositorio();

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
     const { ...dados } = request.only(['nome', 'descricao', 'foto', 'n_vencedor', 'data_inicio', 'data_fim', 'price_percent']);
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

  async generateWinner({ params }){
    try {
      const CONTEST_ID = params.id;
      if (!CONTEST_ID) {
        return this.dataResponse.dataReponse(400, "Contest Id is required");
      }

      const listagemVencedor = await this.vencedorRepositorio.getByContestId(
        {page:1, perPage: 2},
        CONTEST_ID
      );

      if(listagemVencedor?.data?.length){
        return this.dataResponse.dataReponse(400, 'o vencedor já existe')
      }

      const contestData = await this.concursoRepositorio.listarById(CONTEST_ID);

      if (contestData && contestData.length) {
        const { n_vencedor: winnerCount, price_percent: pricePercent } =
          contestData[0];

        const winners = [];

        const contestEntryData =
          await this.contestEntryRepositorio.getAllByContestId(CONTEST_ID); // all entry of this contest(ID)

        if (contestEntryData) {
          let totalVotes = 0;
          let voteContestEntryMapping = new Map(); // creating mapping to find entry with max votes; entry id -> total votes

          for (const entry of contestEntryData) {
            //iterating over each contest entry
            const { id: contestEntryId, vote: contestEntryVote } = entry;
            totalVotes = totalVotes + contestEntryVote;

            const existingVote = voteContestEntryMapping.get(contestEntryId);
            if (existingVote) {
              voteContestEntryMapping.set(
                contestEntryId,
                contestEntryVote + existingVote
              );
            } else {
              voteContestEntryMapping.set(contestEntryId, contestEntryVote);
            }
          }

          voteContestEntryMapping = Array.from(voteContestEntryMapping);
          voteContestEntryMapping.sort((a, b) => b[1] - a[1]); // sorting data in desc order of votes

          voteContestEntryMapping.splice(winnerCount); // picking up top winner entry

          for (const entry of voteContestEntryMapping) {
            // iterating over winning entry
            const [contestEntryId] = entry;

            const votacao =
              await this.votacaoRepositorio.getAllByContestEntryId(
                contestEntryId
              ); // for each contest entry finding vote data

            let voteClientMapping = new Map(); // creating mapping to find client with max votes for this entry; entry id -> total votes

            let entryTotalVotes = 0;
            for (const vote of votacao) {
              const { cliente_id, voto } = vote;
              entryTotalVotes = entryTotalVotes + voto;
              const existingClient = voteClientMapping.get(cliente_id);
              if (existingClient) {
                voteClientMapping.set(cliente_id, voto + existingClient);
              } else {
                voteClientMapping.set(cliente_id, voto);
              }
            }

            voteClientMapping = Array.from(voteClientMapping);
            voteClientMapping.sort((a, b) => b[1] - a[1]);
            voteClientMapping.splice(1); // picking up top winner client

            winners.push({
              contestEntryId,
              clienteId: voteClientMapping[0][0],
              entryTotalVotes,
            });
          }

          let remainingAmount = totalVotes;

          for (let index in winners) {
            index = parseInt(index);
            const winningAmount = (remainingAmount * pricePercent) / 100;

            winners[index] = {
              ...winners[index],
              winningAmount,
              position: index + 1,
            };

            remainingAmount = remainingAmount - winningAmount;
          }

          winners[0] = {
            ...winners[0],
            winningAmount: winners[0].winningAmount + remainingAmount / 2,
          };

          for (const winner of winners) {
            const {
              contestEntryId,
              clienteId,
              entryTotalVotes,
              winningAmount,
              position,
            } = winner;

            let entry = contestEntryData.find(
              (data) => data.id == contestEntryId
            );

            let data = {
              concurso_id: CONTEST_ID,
              participante_id: entry.artist_id,
              posicao: position,
              total_votos: entryTotalVotes,
              premio: winningAmount,
            };

            let vencedor = await this.vencedorRepositorio.criar(data);

            delete data.participante_id;

            data.cliente_id = clienteId;

            let vencedorClient = await this.vencedorClienteRepositorio.criar(
              data
            );
          }

          return this.dataResponse.dataReponse(
            200,
            " Concurso Atualizada com sucesso",
            winners
          );
        } else {
          return this.dataResponse.dataReponse(
            400,
            " Concurso entry not found"
          );
        }
      } else {
        return this.dataResponse.dataReponse(400, " Concurso not found");
      }
    } catch (error) {
      console.log(
        "file: ConcursoController.js:245 ~ ConcursoController ~ generateWinner ~ error:",
        error
      );
    }
  }
}

module.exports = ConcursoController
