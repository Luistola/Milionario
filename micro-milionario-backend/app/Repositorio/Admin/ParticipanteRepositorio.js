const ParticipanteModel= use('App/Models/Participante');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class ParticipanteRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Participante")
    }

    async cadastrado(dados) {

        const participante = await ParticipanteModel.query()
            .where('nome', dados.nome).getCount();
            if(participante){
                throw new NotCreatedException
            }
        return participante;
    }

    async listar1(pagination, dados){
        let participanteListar
        if(dados==undefined || dados== null){
            participanteListar= await ParticipanteModel.query()
            .orderBy("created_at", 'desc')
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return participanteListar.toJSON()
        }else{
            participanteListar= await ParticipanteModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return participanteListar.toJSON();
        }
    }


    async listarByConcurso(pagination, dados){
      let participanteListar
      participanteListar= await ParticipanteModel.query()
      .select(
          "participantes.id AS participante_id",
          "participantes.concurso_id AS participante_concurso_id",
          "participantes.artist_id AS participante_artist_id",
          "participantes.is_delete AS participante_is_delete",
          "participantes.created_at AS participante_created_at",
          "participantes.updated_at AS participante_updated_at",
          "concursos.id AS concurso_id",
          "concursos.nome AS concurso_nome",
          "concursos.foto AS concurso_foto",
          "concursos.descricao AS concurso_descricao",
          "concursos.premio AS concurso_premio",
          "concursos.n_vencedor AS concurso_n_vencedor",
          "concursos.data_inicio AS concurso_data_inicio",
          "concursos.data_fim AS concurso_data_fim",
          "concursos.is_active AS concurso_is_active",
          "concursos.is_delete AS concurso_is_delete",
          "concursos.created_at AS concurso_created_at",
          "concursos.updated_at AS concurso_updated_at",
          "artists.id AS artist_id",
          "artists.user_id AS artist_user_id",
          "artists.nome AS artist_nome",
          "artists.foto AS artist_foto",
          "artists.sexo AS artist_sexo",
          "artists.telefone AS artist_telefone",
          "artists.facebook AS artist_facebook",
          "artists.instagram AS artist_instagram",
          "artists.twitter AS artist_twitter",
          "artists.is_delete AS artist_is_delete",
          "artists.created_at AS artist_created_at",
          "artists.updated_at AS artist_updated_at"
        )
      .orderBy("participantes.created_at", 'desc')
      .innerJoin('concursos', 'participantes.concurso_id', 'concursos.id')
      .innerJoin('artists', 'participantes.artist_id', 'artists.id')
      .where('concurso_id', dados)
      .whereNot('participantes.is_delete',true )
      .paginate(pagination.page, pagination.perPage)

      return participanteListar.toJSON();
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

    async eliminar(idParticipante){
        await this.baseRespositorio.findById(idParticipante)
        return  this.baseRespositorio.delete(idParticipante)

    }

    async atualizar(dadosParticipante, idParticipante){

        await this.baseRespositorio.findById(idParticipante)
        return  this.baseRespositorio.update(idParticipante, dadosParticipante)

    }

}

module.exports= ParticipanteRepositorio
