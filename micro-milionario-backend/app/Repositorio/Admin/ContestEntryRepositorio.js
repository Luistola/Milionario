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

  async getAllByContestId(id) {
    return await this.baseRespositorio.findAllByCol("contest_id", id);
  }

  async getActiveSortedContestById(id) {
    let concursoListar = await ContestEntry.query()
    .where("contest_id", id)
    .innerJoin('artists', 'contest_entries.artist_id', 'artists.user_id')
    .innerJoin('users', 'contest_entries.artist_id', 'users.id')
    .select(
      'contest_entries.*',  
      'artists.foto as artist_foto',
      'artists.nome as artist_nome',
    )
    .orderBy("created_at", "desc")
    .fetch();

    return concursoListar.toJSON();
  }
  
  async getAllEntryByContest(id) {
    try {
      let concursoListar = await ContestEntry.query()
        .where("contest_id", id)
        .innerJoin('artists', 'contest_entries.artist_id', 'artists.user_id')
        .innerJoin('users', 'contest_entries.artist_id', 'users.id')
        .select(
          'contest_entries.*',  
          'artists.nome as artist_nome',
          'users.email as artist_email',
        )
        .fetch();
  
      return concursoListar.toJSON();
    } catch (error) {
      console.log(error);
      throw new Error('Unable to fetch contest entries');
    }
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

  async getEntryByArtistAndContest(artist_id, contest_id) {
    let concursoListar = await ContestEntry.query()
      .where({
        contest_id,
        artist_id,
      })
      .fetch();

    return concursoListar.toJSON();
  }

  async searchWithName(name){
    let concursoListar= await ContestEntry.query()
    .where('title', 'like', `%${name}%`).fetch()

    return concursoListar.toJSON()
}
}

module.exports = ContestEntryRepositorio;
