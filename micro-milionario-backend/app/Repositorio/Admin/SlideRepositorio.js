const SlideModel= use('App/Models/Slide');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class SlideRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("Slide")
    }

    async cadastrado(dados) {

        const Slide = await SlideModel.query()
            .where('nome', dados.nome).getCount();
            if(Slide){
                throw new NotCreatedException
            }
        return Slide;
    }

    async listar1(pagination, dados){
        let slideListar
        if(dados==undefined || dados== null){
            slideListar= await SlideModel.query()
            .orderBy("created_at", 'desc')
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return slideListar.toJSON()
        }else{
            slideListar= await SlideModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .whereNot({ is_delete: true })
            .paginate(pagination.page, pagination.perPage)

            return slideListar.toJSON();
        }
    }

    async listarByUser(user_id){
      let slideListar
      slideListar = await this.baseRespositorio.showById('user_id', user_id)

      return slideListar.toJSON();
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

    async eliminar(idSlide){
        await this.baseRespositorio.findById(idSlide)
        return  this.baseRespositorio.delete(idSlide)

    }

    async atualizar(dadosSlide, idSlide){

        await this.baseRespositorio.findById(idSlide)
        return  this.baseRespositorio.update(idSlide, dadosSlide)

    }

}

module.exports= SlideRepositorio
