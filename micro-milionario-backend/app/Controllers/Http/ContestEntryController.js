"use strict";
const Helpers = use("Helpers");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ContestEntryRepositorio = use(
  "App/Repositorio/Admin/ContestEntryRepositorio"
);
const VotacaoRepositorio = use('App/Repositorio/Admin/VotacaoRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");
const CarteiraRepositorio = use('App/Repositorio/Admin/CarteiraRepositorio');
const ClienteRepositorio = use('App/Repositorio/Admin/ClienteRepositorio');
const ArtistRepositorio = use('App/Repositorio/Admin/ArtistRepositorio');


/**
 * Resourceful controller for interacting
 */
class ContestEntryController {
  constructor() {
    this.votacaoRepositorio = new VotacaoRepositorio();
    this.contestEntryRepositorio = new ContestEntryRepositorio();
    this.dataResponse = new DataResponse();
    this.carteiraRepositorio = new CarteiraRepositorio();
    this.clienteRepositorio = new ClienteRepositorio();
    this.artistRepositorio = new ArtistRepositorio();

  }

  async create({ request }) {
    try {
      let {
        title,
        description,
        contest_id,
        artist_id,
        link,
        link_type,
        vote,
      } = request.body;

      vote = 0;

      if (!artist_id) {
        return this.dataResponse.dataReponse(500, "artist_id is required");
      }
      if (!contest_id) {
        return this.dataResponse.dataReponse(500, "contest_id is required");
      }

      const artistData = await this.artistRepositorio.getArtistByUserId(artist_id)
      
      if(!artistData){
        return this.dataResponse.dataReponse(404, "artist não disponíveis");
      }

      let exits = await this.contestEntryRepositorio.getEntryByArtistAndContest(
        artist_id,
        contest_id
      );

      if (exits?.length) {
        return this.dataResponse.dataReponse(
          208,
          "contest entry already exists"
        );
      }

      let data = await this.contestEntryRepositorio.create({
        title,
        description,
        contest_id,
        artist_id,
        link,
        link_type,
        vote,
      });

      return this.dataResponse.dataReponse(201, "entrada criada com sucesso", data);
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async read({ request }) {
    try {
      const { pagination, dados } = request.only(["pagination", "dados"]);

      let existingDatas = await this.contestEntryRepositorio.listar(
        pagination,
        dados
      );

      if (existingDatas) {
        return this.dataResponse.dataReponse(200, "sucesso", existingDatas);
      } else {
        return this.dataResponse.dataReponse(404, "Dados não encontrados");
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async getByArtistId({ params }) {
    try {
      const artist_id = params.id;
      let existingDatas = await this.contestEntryRepositorio.getByArtistId(
        artist_id
      );

      if (existingDatas && existingDatas?.length) {
        return this.dataResponse.dataReponse(200, "sucesso", existingDatas);
      } else {
        return this.dataResponse.dataReponse(
          404,
          "Dados não encontrados",
          existingDatas
        );
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async getByContestId({ params }) {
    try {
      const contest_id = params.id;
      let existingDatas =
      await this.contestEntryRepositorio.getActiveSortedContestById(
        contest_id
      );

      if (existingDatas) {
        return this.dataResponse.dataReponse(200, "sucesso", existingDatas);
      } else {
        return this.dataResponse.dataReponse(
          404,
          "Dados não encontrados",
          existingDatas
        );
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async adminGetByContestId({ params }) {
    try {
      const contest_id = params.id;
      console.log("file: ContestEntryController.js:152 ~ ContestEntryController ~ adminGetByContestId ~ contest_id:", contest_id)
      let existingDatas = await this.contestEntryRepositorio.getAllEntryByContest(
        contest_id
      );

      console.log("file: ContestEntryController.js:158 ~ ContestEntryController ~ adminGetByContestId ~ existingDatas:", existingDatas)
      if (existingDatas) {
        return this.dataResponse.dataReponse(200, "sucesso", existingDatas);
      } else {
        return this.dataResponse.dataReponse(
          404,
          "Dados não encontrados",
          existingDatas
        );
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async getById({ params }) {
    try {
      const id = params.id;
      let existingDatas = await this.contestEntryRepositorio.getById(id);

      if (existingDatas && existingDatas?.length) {
        return this.dataResponse.dataReponse(200, "sucesso", existingDatas);
      } else {
        return this.dataResponse.dataReponse(
          404,
          "Dados não encontrados",
          existingDatas
        );
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async update({ request, params }) {
    try {
      const { title, description, link, link_type, status, vote } =
        request.body;

      let data = await this.contestEntryRepositorio.updateById(params.id, {
        title,
        description,
        link,
        link_type,
        status,
        vote,
      });

      return this.dataResponse.dataReponse(201, "sucesso", data);
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async delete({ params }) {
    try {
      const id = params.id;

      let existingDatas = await this.contestEntryRepositorio.deleteById(id);

      if (existingDatas) {
        return this.dataResponse.dataReponse(200, "sucesso", existingDatas);
      } else {
        return this.dataResponse.dataReponse(404, "Dados não encontrados");
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async search({request}) {
    // const queryParams = request.get(); // to get all query param

    const title = request.input("title");
    
    const entry = await this.contestEntryRepositorio.searchWithName(title);
    return  this.dataResponse.dataReponse(200, 'sucesso', entry)

  }

  async addVote({ request, params }) {
    try {
      const { vote, user_id } = request.body;
      const id = params.id;

      let contest_entry = await this.contestEntryRepositorio.getById(id);
      
      const clientData = await this.clienteRepositorio.getClientByUserId(user_id)
      if(!clientData){
        return this.dataResponse.dataReponse(404, "client não disponíveis");
      }

      if (contest_entry) {
        
        let carteiraData = await this.carteiraRepositorio.listarByUserId(user_id);
        carteiraData = carteiraData[0];

        if(!carteiraData){
          return this.dataResponse.dataReponse(404, "carteira não encontrados");
        }

        if(carteiraData.pontos < vote){
          return this.dataResponse.dataReponse(404, "pontos não disponíveis");
        }

        let updatedContestEntry = await this.contestEntryRepositorio.updateById(params.id, {
          vote: vote + contest_entry.vote,
        });

        let dados = {};
        dados.pontos = carteiraData.pontos - vote;
        dados.valor_unitel_m = dados.pontos;

        let updatedCarteira = await this.carteiraRepositorio.atualizar({...carteiraData,...dados}, carteiraData.id)

        let votacao = await this.votacaoRepositorio.criar({
          concurso_id: parseInt(updatedContestEntry.contest_id),
          contest_entry_id: updatedContestEntry.id,
          participante_id: parseInt(updatedContestEntry.artist_id),
          cliente_id: clientData.id,
          voto: vote,
        });
       
        return this.dataResponse.dataReponse(200, "sucesso", updatedContestEntry);
      } else {
        return this.dataResponse.dataReponse(
          404,
          "Dados não encontrados",
          contest_entry
        );
      }
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }
}

module.exports = ContestEntryController;
