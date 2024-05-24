const ContactoModel= use('App/Models/Contacto');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class ContactoRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Contacto")
    }

    async cadastrado(dados) {

        const contacto = await ContactoModel.query()
            .where('nome', dados.nome).getCount();
            if(contacto){
                throw new NotCreatedException
            }
        return contacto;
    }

    async listar1(pagination, dados){
        let contactoListar
        if(dados==undefined || dados== null){
            contactoListar= await ContactoModel.query()
            .orderBy("created_at", 'desc')
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return contactoListar.toJSON()
        }else{
            contactoListar= await ContactoModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return contactoListar.toJSON();
        }
    }

    async listarByUser(user_id){
      let contactoListar
      contactoListar = await this.baseRespositorio.showById('user_id', user_id)

      return contactoListar.toJSON();
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

    async eliminar(idContacto){
        await this.baseRespositorio.findById(idContacto)
        return  this.baseRespositorio.delete(idContacto)

    }

    async atualizar(dadosContacto, idContacto){

        await this.baseRespositorio.findById(idContacto)
        return  this.baseRespositorio.update(idContacto, dadosContacto)

    }

}

module.exports= ContactoRepositorio
