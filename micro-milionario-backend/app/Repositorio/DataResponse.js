class DataResponse {

    
     dataReponse(code, message, dado_response){

        return Object.assign({}, {code:code}, {message:message}, {dados:dado_response})
     }
}

module.exports= DataResponse