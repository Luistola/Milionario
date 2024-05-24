const ParametroModel= use('App/Models/Parametro');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class ParametroRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Parametro")
    }

    async cadastrado(dados) {

        const parametro = await ParametroModel.query()
            .where('nome', dados.nome).getCount();
            if(parametro){
                throw new NotCreatedException
            }
        return parametro;
    }

    async listar1(pagination, dados){
        let parametroListar
        if(dados==undefined || dados== null){
            parametroListar= await ParametroModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return parametroListar.toJSON()
        }else{
            parametroListar= await ParametroModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return parametroListar.toJSON();
        }
    }

    async listarById(id){
      let parametroListar
      parametroListar = await this.baseRespositorio.showByIdAlternative('id', id)

      return parametroListar.toJSON();
    }

    async index(){
        return await this.baseRespositorio.index()
     }

    async criar(dados){

        await this.cadastrado(dados)
        return await this.baseRespositorio.create(dados)

    }

    async listar(pagination, dados){
        return this.listar1(pagination, dados)

    }

    async eliminar(idParametro){
        await this.baseRespositorio.findById(idParametro)
        return  this.baseRespositorio.delete(idParametro)

    }

    async atualizar(dadosParametro, idParametro){

        await this.baseRespositorio.findById1(idParametro)
        return  this.baseRespositorio.update(idParametro, dadosParametro)

    }

}

module.exports= ParametroRepositorio
