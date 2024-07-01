const BaseRepositorio = use("App/Repositorio/Geral/BaseRepositorio");
const ContestEntry = use("App/Models/ContestEntry");

class ContestEntryRepositorio {
  constructor() {
    this.baseRespositorio = new BaseRepositorio("ContestEntry");
  }

  async listar1(pagination, dados) {
    let concursoListar = await ContestEntry.query()
      .orderBy("created_at", "asc")
      .paginate(pagination.page, pagination.perPage);

    return concursoListar.toJSON();
  }

  async create(data) {
    return await this.baseRespositorio.create(data);
  }

  async getAll() {
    return await this.baseRespositorio.find();
  }

  async getByArtistId(id) {
    return await this.baseRespositorio.findByCol("artist_id", id);
  }

  async getByContestId(id) {
    return await this.baseRespositorio.findByCol("contest_id", id);
  }

  async getActiveSortedContestById(id) {
    return await this.baseRespositorio.findByColSortedByCreatedAtWithStatus(
      "contest_id",
      id,
      "asc",
      1
    );
  }

  async getById(id) {
    return await this.baseRespositorio.findByCol("id", id);
  }

  async updateById(id, data) {
    return this.baseRespositorio.update(id, data);
  }

  async deleteById(id) {
    return this.baseRespositorio.deleteData("id", id);
  }

  async listar(pagination, dados) {
    return this.listar1(pagination, dados);
  }
}

module.exports = ContestEntryRepositorio;
