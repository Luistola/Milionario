const RolesModel= use('App/Models/Role');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class RolesRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Role")
    }

    async cadastrado(dados) {

        const roles = await RolesModel.query()
            .where('nome', dados.nome).getCount();
            if(roles){
                throw new NotCreatedException
            }
        return roles;
    }

    async listar1(pagination, dados){
        let rolesListar
        if(dados==undefined || dados== null){
            rolesListar= await RolesModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return rolesListar.toJSON()
        }else{
            rolesListar= await RolesModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return rolesListar.toJSON();
        }
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

    async eliminar(idRoles){
        await this.baseRespositorio.findById(idRoles)
        return  this.baseRespositorio.delete(idRoles)

    }

    async atualizar(dadosRoles, idRoles){

        await this.baseRespositorio.findById(idRoles)
        return  this.baseRespositorio.update(idRoles, dadosRoles)

    }

}

module.exports= RolesRepositorio
