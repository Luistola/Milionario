const BaseRepositorio = use('App/Repositorio/Geral/BaseRepositorio')

class ContestEntryRepositorio {

    constructor() {
        this.baseRespositorio = new BaseRepositorio("ContestEntry")
    }

    async create(data) {
        return await this.baseRespositorio.create(data)
    }

    async getAll() {
        return await this.baseRespositorio.find()
    }

    async getByArtistId(id) {
        return await this.baseRespositorio.findByCol("artist_id", id)
    }

    async updateById(id, data) {
        return this.baseRespositorio.update(id, data)
    }


}

module.exports = ContestEntryRepositorio
