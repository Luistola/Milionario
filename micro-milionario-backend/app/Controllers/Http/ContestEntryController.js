"use strict";
const Helpers = use("Helpers");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ContestEntryRepositorio = use(
  "App/Repositorio/Admin/ContestEntryRepositorio"
);
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting
 */
class ContestEntryController {
  constructor() {
    this.contestEntryRepositorio = new ContestEntryRepositorio();
    this.dataResponse = new DataResponse();
  }

  async create({ request }) {
    try {
      const {
        title,
        description,
        contest_id,
        artist_id,
        link,
        link_type,
        vote,
      } = request.body;

      let data = await this.contestEntryRepositorio.create({
        title,
        description,
        contest_id,
        artist_id,
        link,
        link_type,
        vote,
      });

      return this.dataResponse.dataReponse(201, "sucesso", data);
    } catch (error) {
      return this.dataResponse.dataReponse(500, "erro", error);
    }
  }

  async read() {
    try {
      let existingDatas = await this.contestEntryRepositorio.getAll();

      if (existingDatas && existingDatas?.length) {
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
      let existingDatas = await this.contestEntryRepositorio.getByContestId(
        contest_id
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
}

module.exports = ContestEntryController;
