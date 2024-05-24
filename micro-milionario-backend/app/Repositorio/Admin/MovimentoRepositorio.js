const MovimentoModel= use('App/Models/Movimento');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class MovimentoRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Movimento")
    }

    async cadastrado(dados) {

        const movimento = await MovimentoModel.query()
            .where('nome', dados.nome).getCount();
            if(movimento){
                throw new NotCreatedException
            }
        return movimento;
    }

    async listar1(pagination, dados){
        let movimentoListar
        if(dados==undefined || dados== null){
            movimentoListar= await MovimentoModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return movimentoListar.toJSON()
        }else{
            movimentoListar= await MovimentoModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return movimentoListar.toJSON();
        }
    }

    async listarById(id){
      let movimentoListar
      movimentoListar = await this.baseRespositorio.showById('user_id', id)

      return movimentoListar.toJSON();
    }

    async listarByUserId(user_id){
      let movimentoListar
      movimentoListar = await this.baseRespositorio.showById('user_id', user_id)

      return movimentoListar.toJSON();
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

    async eliminar(idMovimento){
        await this.baseRespositorio.findById(idMovimento)
        return  this.baseRespositorio.delete(idMovimento)

    }

    async atualizar(dadosMovimento, idMovimento){
        await this.baseRespositorio.findById(idMovimento)
        return await this.baseRespositorio.update(idMovimento, dadosMovimento)

    }

}

module.exports= MovimentoRepositorio
