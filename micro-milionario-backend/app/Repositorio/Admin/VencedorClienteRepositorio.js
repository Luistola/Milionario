const VencedorClienteModel= use('App/Models/VencedorCliente');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')
const NotCreatedException= use('App/Exceptions/NotCreatedException')

class VencedorClienteRepositorio{

    constructor(){
        this.baseRespositorio = new BaseRepositorio("VencedorCliente")
    }

    async cadastrado(dados) {

        const vencedorCliente = await VencedorClienteModel.query()
            .where('nome', dados.nome).getCount();
            if(vencedorCliente){
                throw new NotCreatedException
            }
        return vencedorCliente;
    }

    async listar1(pagination, dados){
        let vencedorClienteListar
        if(dados==undefined || dados== null){
            vencedorClienteListar= await VencedorClienteModel.query()
            .orderBy("created_at", 'desc')
            .paginate(pagination.page, pagination.perPage)

            return vencedorClienteListar.toJSON()
        }else{
            vencedorClienteListar= await VencedorClienteModel.query()
            .orderBy("created_at", 'desc')
            .where('nome', 'like', `%${dados}%`)
            .paginate(pagination.page, pagination.perPage)

            return vencedorClienteListar.toJSON();
        }
    }

    async listarVencedorClientes(pagination, dados){
      let vencedorClienteListar
      vencedorClienteListar= await VencedorClienteModel.query()
      .select(
          "vencedor_clientes.id AS vecedor_id",
          "vencedor_clientes.concurso_id AS vencedor_concurso_id",
          "vencedor_clientes.cliente_id AS vencedor_cliente_id",
          "vencedor_clientes.posicao AS vencedor_posicao",
          "vencedor_clientes.total_votos AS vencedor_total_votos",
          "vencedor_clientes.premio AS vencedor_premio",
          "vencedor_clientes.data AS vencedor_data",
          "vencedor_clientes.is_delete AS vencedor_is_delete",
          "vencedor_clientes.created_at AS vencedor_created_at",
          "vencedor_clientes.updated_at AS vencedor_updated_at",
          "concursos.id AS concurso_id",
          "concursos.nome AS concurso_nome",
          "concursos.data_fim AS concurso_data_fim",
          "concursos.n_vencedor AS concurso_n_vencedor",
          "clientes.id AS cliente_id",
          "clientes.user_id AS cliente_user_id",
          "clientes.nome AS cliente_nome",
        )
      .innerJoin('concursos', 'concurso_id', 'concursos.id')
      .innerJoin('clientes', 'cliente_id', 'clientes.id')
      .orderBy("vencedor_posicao", 'asc')
      .where('vencedor_clientes.concurso_id', dados)
      .paginate(pagination.page, pagination.perPage)

      return vencedorClienteListar.toJSON();
    }

    async listarById(id){
      let vencedorClienteListar
      vencedorClienteListar = await this.baseRespositorio.showById('user_id', id)

      return vencedorClienteListar.toJSON();
    }

    async listarByUserId(user_id){
      let vencedorClienteListar
      vencedorClienteListar = await this.baseRespositorio.showById('user_id', user_id)

      return vencedorClienteListar.toJSON();
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

module.exports= VencedorClienteRepositorio
