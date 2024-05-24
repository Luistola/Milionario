const VotacaoModel= use('App/Models/Votacao');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')
const Database = use('Database')

class VotacaoRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Votacao")
    }

    async cadastrado(dados) {

        const votacao = await VotacaoModel.query()
            .where('nome', dados.nome).getCount();
            if(votacao){
                throw new NotCreatedException
            }
        return votacao;
    }

    async listar1(pagination, dados){
        let votacaoListar
        if(dados==undefined || dados== null){
            votacaoListar= await VotacaoModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return votacaoListar.toJSON()
        }else{
            votacaoListar= await VotacaoModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return votacaoListar.toJSON();
        }
    }

    async listarByConcurso(pagination, dados){
      let votacaoListar
      votacaoListar= await VotacaoModel.query()
      .select(
          "votacaos.id AS votacao_id",
          "votacaos.concurso_id AS votacao_concurso_id",
          "votacaos.participante_id AS votacao_participante_id",
          "votacaos.cliente_id AS votacao_cliente_id",
          "votacaos.is_delete AS votacao_is_delete",
          "votacaos.created_at AS votacao_created_at",
          "votacaos.updated_at AS votacao_updated_at",
          "concursos.id AS concurso_id",
          "concursos.nome AS concurso_nome",
          "concursos.foto AS concurso_foto",
          "concursos.descricao AS concurso_descricao",
          "concursos.n_vencedor AS concurso_n_vencedor",
          "concursos.data_fim AS concurso_data_fim",
          "participantes.id AS participante_id",
          "participantes.concurso_id AS participante_concurso_id",
          "participantes.artist_id AS participante_artist_id",
          "clientes.id AS cliente_id",
          "clientes.user_id AS cliente_user_id",
          "clientes.nome AS cliente_nome",
          "artists.id AS artist_id",
          "artists.user_id AS artist_user_id",
          "artists.nome AS artist_nome",
          "artists.foto AS artist_foto"
        )
      .select(Database.raw('SUM(votacaos.voto) AS votos'))
      .innerJoin('concursos', 'concurso_id', 'concursos.id')
      .innerJoin('participantes', 'participante_id', 'participantes.id')
      .innerJoin('clientes', 'cliente_id', 'clientes.id')
      .innerJoin('artists', 'artist_id', 'artists.id')
      .groupBy('votacaos.participante_id')
      .orderBy("votos", 'desc')
      .where('votacaos.concurso_id', dados)
      .paginate(pagination.page, pagination.perPage)

      return votacaoListar.toJSON();
    }


    async listaClienteMaisVotos(pagination, dados){
      let votacaoListar
      votacaoListar= await VotacaoModel.query()
      .select(
          "votacaos.id AS votacao_id",
          "votacaos.concurso_id AS votacao_concurso_id",
          "votacaos.participante_id AS votacao_participante_id",
          "votacaos.cliente_id AS votacao_cliente_id",
          "votacaos.is_delete AS votacao_is_delete",
          "votacaos.created_at AS votacao_created_at",
          "votacaos.updated_at AS votacao_updated_at",
          "concursos.id AS concurso_id",
          "concursos.nome AS concurso_nome",
          "concursos.foto AS concurso_foto",
          "concursos.descricao AS concurso_descricao",
          "concursos.n_vencedor AS concurso_n_vencedor",
          "concursos.data_fim AS concurso_data_fim",
          "participantes.id AS participante_id",
          "participantes.concurso_id AS participante_concurso_id",
          "participantes.artist_id AS participante_artist_id",
          "clientes.id AS cliente_id",
          "clientes.user_id AS cliente_user_id",
          "clientes.nome AS cliente_nome",
          "artists.id AS artist_id",
          "artists.user_id AS artist_user_id",
          "artists.nome AS artist_nome",
          "artists.foto AS artist_foto"
        )
      .select(Database.raw('SUM(votacaos.voto) AS votos'))
      .innerJoin('concursos', 'concurso_id', 'concursos.id')
      .innerJoin('participantes', 'participante_id', 'participantes.id')
      .innerJoin('clientes', 'cliente_id', 'clientes.id')
      .innerJoin('artists', 'artist_id', 'artists.id')
      .groupBy('votacaos.cliente_id')
      .orderBy("votos", 'desc')
      .where('votacaos.concurso_id', dados)
      .paginate(pagination.page, pagination.perPage)

      return votacaoListar.toJSON();
    }

    async listaTotalVotosByConcurso(dados){
      let votacaoListar
      votacaoListar= await VotacaoModel.query()
      .select(Database.raw('SUM(votacaos.voto) AS votos'))
      .where('votacaos.concurso_id', dados)
      .fetch();

      return votacaoListar.toJSON();
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

    async eliminar(idVotacao){
        await this.baseRespositorio.findById(idVotacao)
        return  this.baseRespositorio.delete(idVotacao)

    }

    async atualizar(dadosVotacao, idVotacao){

        await this.baseRespositorio.findById(idVotacao)
        return  this.baseRespositorio.update(idVotacao, dadosVotacao)

    }

}

module.exports= VotacaoRepositorio
