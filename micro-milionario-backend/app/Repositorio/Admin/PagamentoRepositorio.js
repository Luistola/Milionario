const PagamentoModel= use('App/Models/Pagamento');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class PagamentoRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Pagamento")
    }

    async cadastrado(dados) {

        const pagamento = await PagamentoModel.query()
            .where('nome', dados.nome).getCount();
            if(pagamento){
                throw new NotCreatedException
            }
        return pagamento;
    }

    async listar1(pagination, dados){
        let pagamentoListar
        if(dados==undefined || dados== null){
            pagamentoListar= await PagamentoModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return pagamentoListar.toJSON()
        }else{
            pagamentoListar= await PagamentoModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return pagamentoListar.toJSON();
        }
    }

    async listarById(id){
      let pagamentoListar
      pagamentoListar = await this.baseRespositorio.showById('id', id)

      return pagamentoListar.toJSON();
    }

    async listarLastId(){
      let pagamentoListar
      pagamentoListar = await PagamentoModel.query()
      .max('id as lastId');

      return pagamentoListar;
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

    async eliminar(idPagamento){
        await this.baseRespositorio.findById(idPagamento)
        return  this.baseRespositorio.delete(idPagamento)

    }

    async atualizar(dadosPagamento, idPagamento){

        await this.baseRespositorio.findById(idPagamento)
        return  this.baseRespositorio.update(idPagamento, dadosPagamento)

    }

}

module.exports= PagamentoRepositorio
