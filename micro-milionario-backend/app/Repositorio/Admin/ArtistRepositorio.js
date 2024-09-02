const ArtistModel = use('App/Models/Artist');
const BaseRepositorio = use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException = use('App/Exceptions/NotCreatedException')

class ArtistRepositorio {

    constructor() {
        this.baseRespositorio = new BaseRepositorio("Artist")
    }

    async cadastrado(dados) {

        const artist = await ArtistModel.query()
            .where('nome', dados.nome).getCount();
        if (artist) {
            throw new NotCreatedException
        }
        return artist;
    }

    async listar1(pagination, dados) {
        let artistListar
        if (dados == undefined || dados == null) {
            artistListar = await ArtistModel.query()
                .innerJoin('users', 'artists.user_id', 'users.id')
                .select(
                'artists.*',  
                'users.email as artist_email',
                )
                .orderBy("created_at", 'desc')
                .whereNot({ "artists.is_delete": true })
                .paginate(pagination.page, pagination.perPage)

            return artistListar.toJSON()
        } else {
            artistListar = await ArtistModel.query()
                .innerJoin('users', 'artists.user_id', 'users.id')
                .select(
                'artists.*',  
                'users.email as artist_email',
                )
                .orderBy("created_at", 'desc')
                .where('nome', 'like', `%${dados}%`)
                .whereNot({ "artists.is_delete": true })
                .paginate(pagination.page, pagination.perPage)

            return artistListar.toJSON();
        }
    }

    async listarById(id) {
        let artistListar
        artistListar = await this.baseRespositorio.showById('id', id)

        return artistListar.toJSON();
    }

    async listarByUserId(user_id) {
        let artistListar = await ArtistModel.query().where('user_id', user_id).fetch()

        return artistListar.toJSON();
    }

    async index() {
        return await this.baseRespositorio.index()
    }

    async criar(dados) {

        await this.cadastrado(dados)
        return await this.baseRespositorio.create(dados)

    }

    async listar(pagination, dados) {
        return this.listar1(pagination, dados)

    }

    async eliminar(idArtist) {
        await this.baseRespositorio.findById(idArtist)
        return this.baseRespositorio.delete(idArtist)

    }

    async atualizar(dadosArtist, idArtist) {

        await this.baseRespositorio.findById(idArtist)
        return this.baseRespositorio.update(idArtist, dadosArtist)

    }

    async todosArtistas() {
        const count = await ArtistModel.query().count('* as totalArtista');
        return count;
    }

    async getArtistById(idCliente) {
        return await this.baseRespositorio.findByCol("id", idCliente)
    }

    async getArtistByUserId(idCliente) {
        return await this.baseRespositorio.findByCol("user_id", idCliente)
    }

    async updateById(id, data) {
        return this.baseRespositorio.update(id, data)
    }

    async searchWithName(name,pagination){
        let concursoListar= await ArtistModel.query()
        .where('nome', 'like', `%${name}%`)
        .paginate(pagination.page, pagination.perPage)

        return concursoListar.toJSON()
    }
}

module.exports = ArtistRepositorio
