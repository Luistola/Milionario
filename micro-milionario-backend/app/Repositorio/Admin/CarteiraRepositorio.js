const CarteiraModel= use('App/Models/Carteira');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class CarteiraRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Carteira")
    }

    async cadastrado(dados) {

        const carteira = await CarteiraModel.query()
            .where('nome', dados.nome).getCount();
            if(carteira){
                throw new NotCreatedException
            }
        return carteira;
    }

    async listar1(pagination, dados){
        let carteiraListar
        if(dados==undefined || dados== null){
            carteiraListar= await CarteiraModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return carteiraListar.toJSON()
        }else{
            carteiraListar= await CarteiraModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return carteiraListar.toJSON();
        }
    }

    async listarById(id){
      let carteiraListar
      carteiraListar = await this.baseRespositorio.showById('user_id', id)

      return carteiraListar.toJSON();
    }

    async listarByUserId(user_id){
      let carteiraListar
      carteiraListar = await this.baseRespositorio.showById('user_id', user_id)

      return carteiraListar.toJSON();
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

    async eliminar(idCarteira){
        await this.baseRespositorio.findById(idCarteira)
        return  this.baseRespositorio.delete(idCarteira)

    }

    async atualizar(dadosCarteira, idCarteira){
        await this.baseRespositorio.findById(idCarteira)
        return await this.baseRespositorio.update(idCarteira, dadosCarteira)

    }

}

module.exports= CarteiraRepositorio
