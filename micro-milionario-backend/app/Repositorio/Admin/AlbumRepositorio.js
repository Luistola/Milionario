const AlbumModel= use('App/Models/Album');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class AlbumRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Album")
    }

    async cadastrado(dados) {

        const album = await AlbumModel.query()
            .where('nome', dados.nome).getCount();
            if(album){
                throw new NotCreatedException
            }
        return album;
    }

    async listarWithArtist(pagination, dados){
      let albumListar
      if(dados==undefined || dados== null){
        albumListar= await AlbumModel.query()
        .select(
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
          "albums.updated_at AS album_updated_at",
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
        .orderBy("albums.created_at", 'desc')
        .innerJoin('artists', 'albums.artist_id', 'artists.id')
        .paginate(pagination.page, pagination.perPage)

        return albumListar.toJSON();
      }else{
        albumListar= await AlbumModel.query()
        .select(
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
          "albums.updated_at AS album_updated_at",
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
        .orderBy("albums.created_at", 'desc')
        .innerJoin('artists', 'albums.artist_id', 'artists.id')
        .where('artists.id', dados)
        .paginate(pagination.page, pagination.perPage)

        return albumListar.toJSON();
      }
    }

    async listarByArtist(id){
      let albumListar
      albumListar = await this.baseRespositorio.showById('artist_id', id)

      return albumListar.toJSON();
    }

    async listar1(pagination, dados){
        let albumListar
        if(dados==undefined || dados== null){
            albumListar= await AlbumModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return albumListar.toJSON()
        }else{
            albumListar= await AlbumModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return albumListar.toJSON();
        }
    }

    async listarById(id){
      let albumListar
      albumListar = await this.baseRespositorio.showById('id', id)

      return albumListar.toJSON();
    }

    async listarByUserId(user_id){
      let albumListar
      albumListar = await this.baseRespositorio.showById('user_id', user_id)

      return albumListar.toJSON();
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

    async eliminar(idAlbum){
        await this.baseRespositorio.findById(idAlbum)
        return  this.baseRespositorio.delete(idAlbum)

    }

    async atualizar(dadosAlbum, idAlbum){

        await this.baseRespositorio.findById(idAlbum)
        return  this.baseRespositorio.update(idAlbum, dadosAlbum)

    }

}

module.exports= AlbumRepositorio
