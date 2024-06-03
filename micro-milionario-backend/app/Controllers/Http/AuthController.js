'use strict'

const User = use('App/Models/User')
const UserRepositorio = use('App/Repositorio/Admin/UserRepositorio');
const RoleRepositorio = use('App/Repositorio/Admin/RolesRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

class AuthController {

  constructor(){
    this.userRepositorio = new UserRepositorio();
    this.roleRepositorio = new RoleRepositorio();
    this.dataResponse = new DataResponse();
  }

  async register({ request }){
      const data = request.only(['role_id','username', 'email', 'password'])

      const user = await User.create(data)

      return this.dataResponse.dataReponse(200, "Utilizador Cadastrado!", user)
  }

  async authenticate({ request, auth }){
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);

      // Procura o usuário pelo email
      const user = await User.query().where('email', email).first()

      // Obtém os dados do usuário logado
    const userData = {
      id: user.id,
      role_id: user.role_id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      token: token
      // Adicione outros campos que desejar retornar
    }

    const role = await this.roleRepositorio.getById(user.role_id);

    if (role) {
      userData.role_name = role.nome
    }

      return userData;
  }

  async getUser({response, auth}){
    try {
      return await auth.getUser()
    } catch (error) {
      response.send('Credentials missing')
    }
  }

  async findUserByPhone({request}){

    const {dados}= request.only(['dados']);
    const listagemUtilizador= await this.userRepositorio.buscarUserByPhone(dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Utilizador por Telefone', listagemUtilizador)

  }

  async show({request}){

    const {pagination, dados}= request.only(['pagination','dados']);
    const listagemUtilizador= await this.userRepositorio.listar(pagination,dados);
    return  this.dataResponse.dataReponse(200, 'Listagem de Utilizador', listagemUtilizador)

  }

  async delete({ params }) {

    await this.userRepositorio.eliminar(params.id);
    return this.dataResponse.dataReponse(200, ' Utilizador eliminado com sucesso')

}

  async terminarSessao({auth}) {
      try {
          const token = auth.getAuthHeader().split(' ')[1];

          await auth
              .authenticator('jwt')
              .revokeTokens([token], true)
          return Object.assign({}, { message: 'Sessão Terminada!' })
      } catch (error) {
          return Object.assign({}, { message: 'Falha ao terminar a sessão' })
      }

  }

}

module.exports = AuthController
