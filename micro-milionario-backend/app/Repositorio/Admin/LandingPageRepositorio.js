const BaseRepositorio = use('App/Repositorio/Geral/BaseRepositorio')

class LandingPageRepositorio {

    constructor() {
        this.baseRespositorio = new BaseRepositorio("LandingPage")
    }

    async create(data) {
        return await this.baseRespositorio.create(data)
    }

    async getAll() {
        return await this.baseRespositorio.find()
    }

    async updateById(id, data) {
        return this.baseRespositorio.update(id, data)
    }

}

module.exports = LandingPageRepositorio
