const TweetModel= use('App/Models/Tweet');
const BaseRepositorio= use('App/Repositorio/Geral/BaseRepositorio')

class TweetRepositorio{

    constructor(){
        this.tweetModel = new TweetModel();
        this.baseRespositorio = new BaseRepositorio("Tweet")
    }


    async criar(dados){

        await this.tweetModel.cadastrado(dados)
        return await this.baseRespositorio.create(dados)

    }

    async listar(pagination, dados){
        return this.tweetModel.listar(pagination, dados)
        
    }

    async eliminar(idTweet){
        await this.baseRespositorio.findById(idTweet)
        return  this.baseRespositorio.delete(idTweet)

    }

    async atualizar(dadosTweet, idTweet){

        await this.baseRespositorio.findById(idTweet)
        return  this.baseRespositorio.update(idTweet, dadosTweet)

    }

}

module.exports= TweetRepositorio