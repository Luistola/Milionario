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
      console.log("file: ConcursoController.js:150 ~ ConcursoController ~ generateWinner ~ CONTEST_ID:", CONTEST_ID)
      if (!CONTEST_ID) {
        return this.dataResponse.dataReponse(400, "Contest Id is required");
      }

      const listagemVencedor = await this.vencedorRepositorio.getByContestId(
        {page:1, perPage: 2},
        CONTEST_ID
      );
      console.log("file: ConcursoController.js:157 ~ ConcursoController ~ generateWinner ~ listagemVencedor:", listagemVencedor)

      if(listagemVencedor?.data?.length){
        return this.dataResponse.dataReponse(400, 'o vencedor já existe')
      }

      const contestData = await this.concursoRepositorio.listarById(CONTEST_ID);
      console.log("file: ConcursoController.js:164 ~ ConcursoController ~ generateWinner ~ contestData:", contestData)

      if (contestData && contestData.length) {
        const { n_vencedor: winnerCount, price_percent: pricePercent } =
        contestData[0];
        console.log("file: ConcursoController.js:168 ~ ConcursoController ~ generateWinner ~ pricePercent:", pricePercent)
        console.log("file: ConcursoController.js:168 ~ ConcursoController ~ generateWinner ~ winnerCount:", winnerCount)

        const winners = [];

        const contestEntryData =
        await this.contestEntryRepositorio.getAllByContestId(CONTEST_ID); // all entry of this contest(ID)
        console.log("file: ConcursoController.js:175 ~ ConcursoController ~ generateWinner ~ contestEntryData:", contestEntryData)

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
          console.log("file: ConcursoController.js:186 ~ ConcursoController ~ generateWinner ~ totalVotes:", totalVotes)
          console.log("file: ConcursoController.js:196 ~ ConcursoController ~ generateWinner ~ voteContestEntryMapping:", voteContestEntryMapping)

          voteContestEntryMapping = Array.from(voteContestEntryMapping);
          voteContestEntryMapping.sort((a, b) => b[1] - a[1]); // sorting data in desc order of votes

          voteContestEntryMapping.splice(winnerCount); // picking up top winner entry
          console.log("file: ConcursoController.js:204 ~ ConcursoController ~ generateWinner ~ voteContestEntryMapping:", voteContestEntryMapping)


          for (const entry of voteContestEntryMapping) {
            console.log("file: ConcursoController.js:208 ~ ConcursoController ~ generateWinner ~ entry:", entry)
            // iterating over winning entry
            const [contestEntryId] = entry;

            const votacao =
            await this.votacaoRepositorio.getAllByContestEntryId(
              contestEntryId
            ); // for each contest entry finding vote data
            console.log("file: ConcursoController.js:213 ~ ConcursoController ~ generateWinner ~ votacao:", votacao)

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
            console.log("file: ConcursoController.js:230 ~ ConcursoController ~ generateWinner ~ voteClientMapping:", voteClientMapping)

            voteClientMapping = Array.from(voteClientMapping);
            voteClientMapping.sort((a, b) => b[1] - a[1]);
            voteClientMapping.splice(1); // picking up top winner client
            console.log("file: ConcursoController.js:243 ~ ConcursoController ~ generateWinner ~ voteClientMapping:", voteClientMapping)

            winners.push({
              contestEntryId,
              clienteId: voteClientMapping[0][0],
              entryTotalVotes,
              givenvote: voteClientMapping[0][1],
            });
          }

            console.log("file: ConcursoController.js:243 ~ ConcursoController ~ generateWinner ~ winners:", winners)
          let remainingAmount = totalVotes;
          console.log("file: ConcursoController.js:247 ~ ConcursoController ~ generateWinner ~ totalVotes:", totalVotes)
          
          for (let index in winners) {
            console.log("file: ConcursoController.js:247 ~ ConcursoController ~ generateWinner ~ remainingAmount:", remainingAmount)
            index = parseInt(index);
            const winningAmount = ((remainingAmount * pricePercent) / 100);
            console.log("file: ConcursoController.js:253 ~ ConcursoController ~ generateWinner ~ winningAmount:", winningAmount)

            winners[index] = {
              ...winners[index],
              winningAmount: winningAmount / 2,
              position: index + 1,
            };
            console.log("file: ConcursoController.js:256 ~ ConcursoController ~ generateWinner ~ winners:", winners[index])

            remainingAmount = remainingAmount - winningAmount;
            console.log("file: ConcursoController.js:263 ~ ConcursoController ~ generateWinner ~ remainingAmount:", remainingAmount)
          }

          winners[0] = {
            ...winners[0],
            winningAmount: winners[0].winningAmount + remainingAmount / 2,
          };
          console.log("file: ConcursoController.js:267 ~ ConcursoController ~ generateWinner ~ winners:", winners)

          for (const winner of winners) {
            const {
              contestEntryId,
              clienteId,
              entryTotalVotes,
              winningAmount,
              position,
              givenvote
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
            data.total_votos = givenvote;
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
