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

const ConcursoModel = use("App/Models/Concurso");
const ContestEntry = use("App/Models/ContestEntry");
const VotacaoModel = use("App/Models/Votacao");
const VencedorModel = use("App/Models/Vencedor");
const VencedorClienteModel = use("App/Models/VencedorCliente");

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
   async index ({request}) {
    const ended = request.input("ended");
    let listarTodosConcurso= await this.concursoRepositorio.index();

    if (ended==="true" && listarTodosConcurso?.rows?.length){
      listarTodosConcurso = listarTodosConcurso?.rows?.filter(d=>new Date(d.data_fim).getTime() < new Date().getTime())
    }

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
     const { ...dados } = request.only(['nome', 'descricao', 'foto', 'n_vencedor', 'data_inicio', 'premio', 'data_fim', 'price_percent']);
    await this.concursoRepositorio.criar(dados);
    return this.dataResponse.dataReponse(200, "Concurso criada com sucesso");
  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemConcurso= await this.concursoRepositorio.listar(pagination,dados);
    console.log("file: ConcursoController.js:104 ~ ConcursoController ~ show ~ listagemConcurso:", listagemConcurso)
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso', listagemConcurso)

  }

  async adminShow({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemConcurso= await this.concursoRepositorio.getAllWithPagination(pagination,dados);

    let updatedData = [];
    for(let data of listagemConcurso?.data){
      let allContestEntry = await ContestEntry.query()
        .where("contest_id", data.id)
        .fetch();

      allContestEntry = await allContestEntry.toJSON(); // all entry of this contest(ID)
      
      const totalvotes = allContestEntry.reduce((acc,val)=>val.vote+acc, 0);

      data.totalvotes = totalvotes

      updatedData.push(data);
    }

    listagemConcurso.data = updatedData;
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso', listagemConcurso)

  }

  async showAlt({request}){

    const {dados}= request.only(['dados']);
    let listagemConcurso= await this.concursoRepositorio.listaAlt(dados);
    console.log("file: ConcursoController.js:123 ~ ConcursoController ~ showAlt ~ listagemConcurso:", listagemConcurso)

    if(listagemConcurso && listagemConcurso?.length)
      listagemConcurso = listagemConcurso?.filter((d)=>new Date(d.data_fim)>=new Date())
    
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

  async search({request}) {
    // const queryParams = request.get(); // to get all query param
    // const inputName = request.input("name");

    const { pagination, name:inputName } = request.only(['pagination', 'name']);
    
    const listagemConcurso = await this.concursoRepositorio.searchWithName(inputName, pagination);
  
    return  this.dataResponse.dataReponse(200, 'Listagem de Concurso', listagemConcurso)
  }

  async generateWinner({ params }){
    try {
      const CONTEST_ID = params.id;

      let contest = await ConcursoModel.query().where("id", CONTEST_ID).fetch();
      contest = await contest.toJSON()[0];
      console.log("file: ConcursoController.js:186 ~ ConcursoController ~ generateWinner ~ contest:", contest)

      console.log(
        "ConcursoController CONTEST_ID: ",
        CONTEST_ID,
        "end date -",
        contest.data_fim,
        "current date -",
        new Date(),
        "expired -",
        contest.data_fim < new Date()
      );

      let existingWinnerData = await VencedorModel.query()
        .where("concurso_id", CONTEST_ID)
        .fetch();
      existingWinnerData = await existingWinnerData.toJSON();
      console.log("existingWinnerData:", existingWinnerData.length);

      // if (existingWinnerData?.length) continue;

      const { n_vencedor: winner_count, price_percent } = contest;

      const winners = [];

      let allContestEntry = await ContestEntry.query()
        .where("contest_id", CONTEST_ID)
        .fetch();

      allContestEntry = await allContestEntry.toJSON(); // all entry of this contest(ID)

      console.log("allContestEntry.length:", allContestEntry.length);
      // if (!allContestEntry.length) continue;

      let contest_total_votes = 0;
      let votes_per_entry = new Map(); // creating mapping to find entry with max votes; entry id -> total votes

      for (const entry of allContestEntry) {
        //iterating over each contest entry
        const { id: entry_id, vote: entry_votes } = entry;

        contest_total_votes = contest_total_votes + entry_votes;

        const existing_entry_vote = votes_per_entry.get(entry_id);

        if (existing_entry_vote) {
          votes_per_entry.set(entry_id, entry_votes + existing_entry_vote);
        } else {
          votes_per_entry.set(entry_id, entry_votes);
        }
      }

      console.log("votes_per_entry.size:", votes_per_entry.size);
      console.log("contest_total_votes:", contest_total_votes);

      // if (!contest_total_votes || !votes_per_entry.size) continue;

      votes_per_entry = Array.from(votes_per_entry); // converting Map to Array

      if (votes_per_entry.length) {
        votes_per_entry?.sort((a, b) => b[1] - a[1]); // sorting data in desc order of votes
        votes_per_entry?.splice(winner_count); // picking up top winner entry
      }

      for (const entry of votes_per_entry) {
        // iterating over winning entry
        const [entry_id] = entry;

        let votesData = await VotacaoModel.query()
          .where("contest_entry_id", entry_id)
          .fetch();

        votesData = await votesData.toJSON(); // for each contest entry finding vote data

        console.log("votesData:", votesData?.length);

        let client_votes = new Map(); // creating mapping to find client with max votes for this entry; entry id -> total votes
        let entry_total_votes = 0;

        for (const vote of votesData) {
          const { cliente_id, voto } = vote;
          entry_total_votes = entry_total_votes + voto;

          const existing_client_vote = client_votes.get(cliente_id);

          if (existing_client_vote) {
            client_votes.set(cliente_id, voto + existing_client_vote);
          } else {
            client_votes.set(cliente_id, voto);
          }
        }

        client_votes = Array.from(client_votes);

        console.log("client_votes.length:", client_votes.length);
        if (client_votes.length) {
          client_votes.sort((a, b) => b[1] - a[1]);
          client_votes.splice(1); // picking up top winner client
        }

        if (client_votes.length)
          winners.push({
            entry_id,
            client_id: client_votes[0][0],
            entry_total_votes,
            given_vote: client_votes[0][1],
          });
      }

      let remainingAmount = contest_total_votes;

      console.log("winners.length:", winners.length);

      // if (!winners.length) continue;

      for (let index in winners) {
        index = parseInt(index);

        const winning_amount = (
          (remainingAmount * price_percent) /
          100
        ).toFixed(1);

        winners[index] = {
          ...winners[index],
          winning_amount: winning_amount / 2, // diving amount in artist and fan
          position: index + 1,
        };

        remainingAmount = remainingAmount - winning_amount;
      }

      if (winners.length)
        winners[0] = {
          ...winners[0],
          winning_amount: winners[0].winning_amount + remainingAmount / 2, // diving amount in artist and fan
        };

      console.log(
        "file:ConcursoController generateWinner.js:135 ~ generateWinner ~ winners:",
        winners
      );

      for (const winner of winners) {
        const {
          entry_id,
          client_id,
          entry_total_votes,
          winning_amount,
          position,
          given_vote,
        } = winner;

        const entryData = allContestEntry.find((data) => data.id == entry_id);

        const data = {
          concurso_id: CONTEST_ID,
          participante_id: entryData.artist_id,
          posicao: position,
          total_votos: entry_total_votes,
          premio: winning_amount,
        };

        // SAVE DATA TO WINNER ARTIST
        // let vencedor = await VencedorModel.create(data);
        console.log(
          "file:ConcursoController ConcursoController.js:343 ~ ConcursoController ~ generateWinner ~ data:",
          data
        );
        // vencedor = await vencedor.toJSON();
        // console.log("file: generateWinner.js:175 ~ generateWinner ~ vencedor:", vencedor)

        delete data.participante_id;

        data.cliente_id = client_id;
        data.total_votos = given_vote;

        // SAVE DATA TO WINNER CLIENT
        // let vencedorClient = await VencedorClienteModel.create(data);
        console.log(
          "file: ConcursoController.js:354 ~ ConcursoController ~ generateWinner ~ data:",
          data
        );
        // vencedorClient = await vencedorClient.toJSON();
        // console.log("file: generateWinner.js:185 ~ generateWinner ~ vencedorClient:", vencedorClient)

        // SAVE DATA TO CONTEST
        // let updatedContest = await ConcursoModel.query()
        //   .where("id", CONTEST_ID)
        //   .update({ is_winner_generated: true });
        // console.log("file: generateWinner.js:191 ~ generateWinner ~ updatedContest:", updatedContest)
      }
      return this.dataResponse.dataReponse(
        200,
        " Concurso Atualizada com sucesso",
        winners
      );
    } catch (error) {
    console.log("file: ConcursoController.js: ~ ConcursoController ~ generateWinner ~ error:", error)
    }
  }
}

module.exports = ConcursoController
