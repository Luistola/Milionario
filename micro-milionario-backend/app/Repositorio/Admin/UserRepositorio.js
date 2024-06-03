const UserModel= use('App/Models/User');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const Database = use('Database')

class UserRepositorio{

    constructor(){
        this.userModel = new UserModel();
        this.baseRespositorio = new BaseRepositorio("User")
    }


    async criar(dados){

        await this.userModel.isCadastrado(dados)
        return await this.baseRespositorio.create(dados)

    }

    async listar1(pagination, dados){
        return this.userModel.listar(pagination, dados)

    }

    async listar(pagination, dados){
      let userListar
      userListar= await UserModel.query()
      .select(
          "users.id AS user_id",
          "users.role_id AS user_role_id",
          "users.username AS user_username",
          "users.email AS user_email",
          "users.created_at AS user_created_at",
          "users.updated_at AS user_updated_at",
          "roles.id AS role_id",
          "roles.nome AS role_nome"
        )
      .orderBy("users.created_at", 'desc')
      .innerJoin('roles', 'users.role_id', 'roles.id')
      .whereNot('users.role_id', 2)
      .whereNot('users.role_id', 3)
      .whereNot('users.is_delete', true)
      .paginate(pagination.page, pagination.perPage)

      return userListar.toJSON();
    }

    //! BUSCA O UTILIZADOR PELO NUMERO DE TEL QUE ESTA NA TABELA cliente E artista
    //! UNINDO AS 3 TABELAS
    async buscarUserByPhone(dados){

      const userCliente = await Database
      .from('users')
      .select(
          "email"
        )
      .innerJoin('clientes', 'users.id', 'clientes.user_id')
      .where('clientes.telefone', dados)
      .whereNot('users.is_delete', true)

      const userArtista = await Database
      .from('users')
      .select(
          "email"
        )
      .innerJoin('artists', 'users.id', 'artists.user_id')
      .where('artists.telefone', dados)
      .whereNot('users.is_delete', true)

      const results = userCliente.concat(userArtista)

      return results;
    }

    async eliminar(idUser){
        await this.baseRespositorio.findById(idUser)
        return  this.baseRespositorio.delete(idUser)

    }

    async atualizar(dadosUser, idUser){

        await this.baseRespositorio.findById(idUser)
        return  this.baseRespositorio.update(idUser, dadosUser)

    }

  async getUserById(isUser) {
    return await this.baseRespositorio.findByCol("id", isUser)
  }

}

module.exports= UserRepositorio
