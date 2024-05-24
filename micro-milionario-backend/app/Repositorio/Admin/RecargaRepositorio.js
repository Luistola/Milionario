const RecargaModel = use('App/Models/Recarga');
const BaseRepositorio = use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException = use('App/Exceptions/NotCreatedException')

class RecargaRepositorio {

    constructor() {
        this.baseRespositorio = new BaseRepositorio("Recarga")
    }

    /*    async cadastrado(dados) {

           const recarga = await RecargaModel.query()
               .where('codigo', dados.codigo).getCount();
           if (recarga) {
               throw new NotCreatedException
           }
           return recarga;
       } */

    async listar1(pagination, dados) {
        let recargaListar
        if (dados == undefined || dados == null) {
            recargaListar = await RecargaModel.query()
                .orderBy("created_at", 'desc')
                .paginate(pagination.page, pagination.perPage)

            return recargaListar.toJSON()
        } else {
            recargaListar = await RecargaModel.query()
                .orderBy("created_at", 'desc')
                .where('nome', 'like', `%${dados}%`)
                .paginate(pagination.page, pagination.perPage)

            return recargaListar.toJSON();
        }
    }

    async index() {
        return await this.baseRespositorio.index()
    }

    addValidExpirationDate() {
        const date = new Date()
        date.setMonth(date.getMonth() + 3)
        return date
    }

    generateCodes() {
        const gerarCodigo = Math.floor(100000 + Math.random() * 900000000);

        return gerarCodigo;
    }

    async criar(dados) {

        const gerarReferencia = Math.floor(200000 + Math.random() * 900000000);

        for (let i = 0; i < dados.quantidade; i++) {

            const saldoCarregamento = (dados.preco / 250)

            const recargaPayload = await this.baseRespositorio.create({
                ...dados,
                codigo: this.generateCodes(),
                data_validade: this.addValidExpirationDate(),
                referencia: gerarReferencia,
                saldo: saldoCarregamento

            })
        }
    }

    async listar(pagination, dados) {
        return this.listar1(pagination, dados)

    }

    async eliminar(idRecarga) {
        await this.baseRespositorio.findById(idRecarga)
        return this.baseRespositorio.delete(idRecarga)

    }

    async atualizar(dadosRecarga, idRecarga) {

        await this.baseRespositorio.findById(idRecarga)
        return this.baseRespositorio.update(idRecarga, dadosRecarga)

    }

}

module.exports = RecargaRepositorio
