const VencedorModel= use('App/Models/Vencedor');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class VencedorRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Vencedor")
    }

    async cadastrado(dados) {

        const vencedor = await VencedorModel.query()
            .where('nome', dados.nome).getCount();
            if(vencedor){
                throw new NotCreatedException
            }
        return vencedor;
    }

    async listar1(pagination, dados){
        let vencedorListar
        if(dados==undefined || dados== null){
            vencedorListar= await VencedorModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return vencedorListar.toJSON()
        }else{
            vencedorListar= await VencedorModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return vencedorListar.toJSON();
        }
    }

    async listarVencedores(pagination, dados){
      let vencedorListar
      if(dados==undefined || dados== null){
        vencedorListar= await VencedorModel.query()
        .select(
            "vencedors.id AS vecedor_id",
            "vencedors.concurso_id AS vencedor_concurso_id",
            "vencedors.participante_id AS vencedor_participante_id",
            "vencedors.posicao AS vencedor_posicao",
            "vencedors.total_votos AS vencedor_total_votos",
            "vencedors.premio AS vencedor_premio",
            "vencedors.data AS vencedor_data",
            "vencedors.is_delete AS vencedor_is_delete",
            "vencedors.created_at AS vencedor_created_at",
            "vencedors.updated_at AS vencedor_updated_at",
            "concursos.id AS concurso_id",
            "concursos.nome AS concurso_nome",
            "concursos.data_fim AS concurso_data_fim",
            "concursos.n_vencedor AS concurso_n_vencedor",
            "participantes.id AS participante_id",
            "participantes.concurso_id AS participante_concurso_id",
            "participantes.artist_id AS participante_artist_id",
            "artists.id AS artist_id",
            "artists.user_id AS artist_user_id",
            "artists.nome AS artist_nome",
            "artists.foto AS artist_foto"
          )
        .innerJoin('concursos', 'concurso_id', 'concursos.id')
        .innerJoin('participantes', 'participante_id', 'participantes.id')
        .innerJoin('artists', 'participantes.artist_id', 'artists.id')
        .orderBy("vencedor_posicao", 'asc')
        .paginate(pagination.page, pagination.perPage)

        return vencedorListar.toJSON();
      }else{
        vencedorListar= await VencedorModel.query()
        .select(
            "vencedors.id AS vecedor_id",
            "vencedors.concurso_id AS vencedor_concurso_id",
            "vencedors.participante_id AS vencedor_participante_id",
            "vencedors.posicao AS vencedor_posicao",
            "vencedors.total_votos AS vencedor_total_votos",
            "vencedors.premio AS vencedor_premio",
            "vencedors.data AS vencedor_data",
            "vencedors.is_delete AS vencedor_is_delete",
            "vencedors.created_at AS vencedor_created_at",
            "vencedors.updated_at AS vencedor_updated_at",
            "concursos.id AS concurso_id",
            "concursos.nome AS concurso_nome",
            "concursos.data_fim AS concurso_data_fim",
            "concursos.n_vencedor AS concurso_n_vencedor",
            "participantes.id AS participante_id",
            "participantes.concurso_id AS participante_concurso_id",
            "participantes.artist_id AS participante_artist_id",
            "artists.id AS artist_id",
            "artists.user_id AS artist_user_id",
            "artists.nome AS artist_nome",
            "artists.foto AS artist_foto"
          )
        .innerJoin('concursos', 'concurso_id', 'concursos.id')
        .innerJoin('participantes', 'participante_id', 'participantes.id')
        .innerJoin('artists', 'participantes.artist_id', 'artists.id')
        .orderBy("vencedor_posicao", 'asc')
        .where('vencedors.concurso_id', dados)
        .paginate(pagination.page, pagination.perPage)

        return vencedorListar.toJSON();
      }
    }

    async listarById(id){
      let vencedorListar
      vencedorListar = await this.baseRespositorio.showById('user_id', id)

      return vencedorListar.toJSON();
    }

    async listarByUserId(user_id){
      let vencedorListar
      vencedorListar = await this.baseRespositorio.showById('user_id', user_id)

      return vencedorListar.toJSON();
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

    async eliminar(idVencedor){
        await this.baseRespositorio.findById(idVencedor)
        return  this.baseRespositorio.delete(idVencedor)

    }

    async atualizar(dadosVencedor, idVencedor){
        await this.baseRespositorio.findById(idVencedor)
        return await this.baseRespositorio.update(idVencedor, dadosVencedor)

    }

}

module.exports= VencedorRepositorio
