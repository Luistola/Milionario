'use strict'

class Tweet {
  get rules () {
    return {
      content: 'required| string'
    }
  }

  get messages() {
    return {
      'nome.required': "Escreva o Content",
      'nome.string': 'O Content tem se uma string'
    }
  }


  async fails(erroMessages) {
    return this.ctx.response.status(400).json({ messages: erroMessages[0].message });
  }
  
}

module.exports = Tweet
