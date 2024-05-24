const ConcursoModel= use('App/Models/Concurso');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class ConcursoRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Concurso")
    }

    async cadastrado(dados) {

        const concurso = await ConcursoModel.query()
            .whereNot({ is_active: true }) // Se = 0
            .whereNot({ is_delete: true }) // Se = 0
            .where('nome', dados.nome)
            .getCount();
            if(concurso){
                throw new NotCreatedException
            }
        return concurso;
    }

    async listar1(pagination, dados){
        let concursoListar
        if(dados==undefined || dados== null){
            concursoListar= await ConcursoModel.query()
            .orderBy("created_at", 'desc')
            .whereNot({ is_active: true }) // Se = 0 = Activo
            .whereNot({ is_delete: true }) // Se = 0
            .paginate(pagination.page, pagination.perPage)

            return concursoListar.toJSON()
        }else{
            concursoListar= await ConcursoModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .whereNot({ is_active: true })
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return concursoListar.toJSON();
        }
    }

    async listar2(dados){
      let concursoListar
      if(dados==undefined || dados== null){
          concursoListar= await ConcursoModel.query()
          .orderBy("created_at", 'desc')
          .whereNot({ is_active: true })
          .whereNot({ is_delete: true })
          .fetch();
          // .paginate(pagination.page, pagination.perPage)

          return concursoListar.toJSON()
      }else{
          concursoListar= await ConcursoModel.query()
          .orderBy("created_at", 'desc')
          .where('nome', 'like', `%${dados}%`)
          .whereNot({ is_active: true })
          .whereNot({ is_delete: true })
          .fetch();
          // .paginate(pagination.page, pagination.perPage)

          return concursoListar.toJSON();
      }
  }

    async listarById(id){
      let concursoListar
      concursoListar = await this.baseRespositorio.showById('id', id)

      return concursoListar.toJSON();
    }

    async listarByDataFim(data){
      let concursoListar
      concursoListar= await ConcursoModel.query()
        .where('data_fim', '<=', data)
        .whereNot({ is_active: true })
        .whereNot({ is_delete: true })
        .fetch();

      return concursoListar.toJSON();
    }

    async index(){
        return await this.baseRespositorio.index()
     }

     async indexActive(){
      return await this.baseRespositorio.indexActive()
   }

   async indexPure(){
    return await this.baseRespositorio.indexPure()
  }

    async criar(dados){

        await this.cadastrado(dados)
        return await this.baseRespositorio.create(dados)

    }

    async listar(pagination, dados){
        return this.listar1(pagination, dados)

    }

    async listaAlt(dados){
      return this.listar2(dados)
    }

    async eliminar(idConcurso){
        await this.baseRespositorio.findById(idConcurso)
        return  this.baseRespositorio.delete(idConcurso)

    }

    async atualizar(dadosConcurso, idConcurso){

        await this.baseRespositorio.findById(idConcurso)
        return  this.baseRespositorio.update(idConcurso, dadosConcurso)

    }

    async todosConcursos(){
      const count = await ConcursoModel.query().count('* as totalConcurso');
      return count;
    }

}

module.exports= ConcursoRepositorio
