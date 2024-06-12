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

}

module.exports = ContestEntryRepositorio
