const MusicModel= use('App/Models/Music');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class MusicRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Music")
    }

    async cadastrado(dados) {

        const music = await MusicModel.query()
            .where('nome', dados.nome).getCount();
            if(music){
                throw new NotCreatedException
            }
        return music;
    }

    async listarWithArtist(pagination, dados){
      let musicListar
      if(dados==undefined || dados== null){
        musicListar= await MusicModel.query()
        .select(
            "music.id AS musica_id",
            "music.artist_id AS musica_artist_id",
            "music.titulo AS musica_titulo",
            "music.duracao AS musica_duracao",
            "music.genero AS musica_genero",
            "music.foto AS musica_foto",
            "music.url_musica AS musica_url_musica",
            "music.url_video AS musica_url_video",
            "music.is_delete AS musica_is_delete",
            "music.created_at AS musica_created_at",
            "music.updated_at AS musica_updated_at",
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
            "artists.updated_at AS artist_updated_at",
            "albums.id AS album_id",
            "albums.artist_id AS album_artist_id",
            "albums.nome AS album_nome",
            "albums.descricao AS album_descricao",
            "albums.produtor AS album_produtor",
            "albums.lancamento AS album_lancamento",
            "albums.data_lancamento AS album_data_lancamento",
            "albums.foto AS album_foto",
            "albums.is_delete AS album_is_delete",
            "albums.created_at AS album_created_at",
            "albums.updated_at AS album_updated_at"
          )
        .orderBy("music.created_at", 'desc')
        .innerJoin('artists', 'music.artist_id', 'artists.id')
        .innerJoin('albums', 'music.album_id', 'albums.id')
        .paginate(pagination.page, pagination.perPage)

        return musicListar.toJSON();
      }else{
        musicListar= await MusicModel.query()
        .select(
            "music.id AS musica_id",
            "music.artist_id AS musica_artist_id",
            "music.titulo AS musica_titulo",
            "music.duracao AS musica_duracao",
            "music.genero AS musica_genero",
            "music.foto AS musica_foto",
            "music.url_musica AS musica_url_musica",
            "music.url_video AS musica_url_video",
            "music.is_delete AS musica_is_delete",
            "music.created_at AS musica_created_at",
            "music.updated_at AS musica_updated_at",
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
            "artists.updated_at AS artist_updated_at",
            "albums.id AS album_id",
            "albums.artist_id AS album_artist_id",
            "albums.nome AS album_nome",
            "albums.descricao AS album_descricao",
            "albums.produtor AS album_produtor",
            "albums.lancamento AS album_lancamento",
            "albums.data_lancamento AS album_data_lancamento",
            "albums.foto AS album_foto",
            "albums.is_delete AS album_is_delete",
            "albums.created_at AS album_created_at",
            "albums.updated_at AS album_updated_at"
          )
        .orderBy("music.created_at", 'desc')
        .innerJoin('artists', 'music.artist_id', 'artists.id')
        .innerJoin('albums', 'music.album_id', 'albums.id')
        .where('artists.user_id', dados)
        .paginate(pagination.page, pagination.perPage)

        return musicListar.toJSON();
      }
    }

    async listar1(pagination, dados){
        let musicListar
        if(dados==undefined || dados== null){
            musicListar= await MusicModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return musicListar.toJSON()
        }else{
            musicListar= await MusicModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return musicListar.toJSON();
        }
    }

    async listarByArtist(id){
      let musicListar
      musicListar = await this.baseRespositorio.showById('artist_id', id)

      return musicListar.toJSON();
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

    async eliminar(idMusic){
        await this.baseRespositorio.findById(idMusic)
        return  this.baseRespositorio.delete(idMusic)

    }

    async atualizar(dadosMusic, idMusic){

        await this.baseRespositorio.findById(idMusic)
        return  this.baseRespositorio.update(idMusic, dadosMusic)

    }

}

module.exports= MusicRepositorio
