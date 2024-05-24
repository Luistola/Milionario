const PagamentoRecargaModel= use('App/Models/PagamentoRecarga');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class PagamentoRecargaRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("PagamentoRecarga")
    }

    async cadastrado(dados) {

        const pagamentoRecarga = await PagamentoRecargaModel.query()
            .where('nome', dados.nome).getCount();
            if(pagamentoRecarga){
                throw new NotCreatedException
            }
        return pagamentoRecarga;
    }

    async listar1(pagination, dados){
        let pagamentoRecargaListar
        if(dados==undefined || dados== null){
            pagamentoRecargaListar= await PagamentoRecargaModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return pagamentoRecargaListar.toJSON()
        }else{
            pagamentoRecargaListar= await PagamentoRecargaModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return pagamentoRecargaListar.toJSON();
        }
    }

    async listarById(id){
      let pagamentoRecargaListar
      pagamentoRecargaListar = await this.baseRespositorio.showById('id', id)

      return pagamentoRecargaListar.toJSON();
    }

    async index(){
        return await this.baseRespositorio.index()
     }

    async criar(dados){

        // await this.cadastrado(dados)
        return await this.baseRespositorio.create(dados)

    }

    async listar(pagination, dados){
        return this.listar1(pagination, dados)

    }

    async eliminar(idPagamentoRecarga){
        await this.baseRespositorio.findById(idPagamentoRecarga)
        return  this.baseRespositorio.delete(idPagamentoRecarga)

    }

    async atualizar(dadosPagamentoRecarga, idPagamentoRecarga){

        await this.baseRespositorio.findById(idPagamentoRecarga)
        return  this.baseRespositorio.update(idPagamentoRecarga, dadosPagamentoRecarga)

    }

}

module.exports= PagamentoRecargaRepositorio
