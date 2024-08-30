const ClienteModel = use('App/Models/Cliente');
const BaseRepositorio = use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException = use('App/Exceptions/NotCreatedException')

class ClienteRepositorio {

    constructor() {
        this.baseRespositorio = new BaseRepositorio("Cliente")
    }

    async cadastrado(dados) {

        const cliente = await ClienteModel.query()
            .where('nome', dados.nome).getCount();
        if (cliente) {
            throw new NotCreatedException
        }
        return cliente;
    }

    async listar1(pagination, dados) {
        let clienteListar
        if (dados == undefined || dados == null) {
            clienteListar = await ClienteModel.query()
            .innerJoin('users', 'clientes.user_id', 'users.id')
                .select(
                'clientes.*',  
                'users.email as artist_email',
                )
                .orderBy("created_at", 'desc')
                .whereNot({ "clientes.is_delete": true })
                .paginate(pagination.page, pagination.perPage)

            return clienteListar.toJSON()
        } else {
            clienteListar = await ClienteModel.query()
                .orderBy("created_at", 'desc')
                .where('nome', 'like', `%${dados}%`)
                .whereNot({ is_delete: true })
                .paginate(pagination.page, pagination.perPage)

            return clienteListar.toJSON();
        }
    }

    async listarByUser(user_id) {
        let clienteListar
        clienteListar = await this.baseRespositorio.showById('user_id', user_id)

        return clienteListar.toJSON();
    }

    async listarById(id) {
        let clienteListar = await ClienteModel.query()
        .where('id', id).fetch()

        return clienteListar.toJSON();
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

    async eliminar(idCliente) {
        await this.baseRespositorio.findById(idCliente)
        return this.baseRespositorio.delete(idCliente)

    }

    async atualizar(dadosCliente, idCliente) {

        await this.baseRespositorio.findById(idCliente)
        return this.baseRespositorio.update(idCliente, dadosCliente)

    }

    async getClientById(idCliente) {
        return await this.baseRespositorio.findByCol("id", idCliente)
    }

    async getClientByUserId(idCliente) {
        return await this.baseRespositorio.findByCol("user_id", idCliente)
    }

    async todosClientes() {
        const count = await ClienteModel.query().count('* as totalCliente');
        return count;
    }

    async updateById(id, data) {
        return this.baseRespositorio.update(id, data)
    }

    async searchWithName(name, pagination){
        let client= await ClienteModel.query()
        .where('nome', 'like', `%${name}%`)
        .paginate(pagination.page, pagination.perPage)

        return client.toJSON()
    }
}

module.exports = ClienteRepositorio
