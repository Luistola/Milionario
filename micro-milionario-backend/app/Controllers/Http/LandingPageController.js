'use strict'
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const LandingPageRepositorio = use('App/Repositorio/Admin/LandingPageRepositorio');
const DataResponse = use("App/Repositorio/DataResponse");

/**
 * Resourceful controller for interacting with clientes
 */
class LandingPageController {
  constructor() {
    this.landingPageRepositorio = new LandingPageRepositorio();
    this.dataResponse = new DataResponse();
  }

  async add({ request }) {
    try {

      const image = request.file('file')

      let savedfilename = ""
      let imageType = ""
      if (image) {
        imageType = request.file('file').type;
        const fileName = request.file('file').clientName;
        const timestamp = Date.now()
        console.log(Helpers.publicPath('uploads'));
        await image.move(Helpers.publicPath('uploads'), {
          name: timestamp + fileName
        })

        if (!image.moved()) {
          return image.error()
        } else {
          console.log('Sucesso!');
          savedfilename = timestamp + fileName
        }
      }

      const { title, description } = request.body;

      let existingDatas = await this.landingPageRepositorio.getAll();

      if (existingDatas && existingDatas?.length) {
        let existingData = existingDatas[0];

        if (title) {
          existingData.title = title;
        }
        if (description) {
          existingData.description = description;
        }

        if (image) {
          existingData.file = savedfilename;
          existingData.type = imageType
        }

        let data = await this.landingPageRepositorio.updateById(existingData.id, existingData);

        return this.dataResponse.dataReponse(202, 'Atualizado com sucesso', data)
      } else {

        let data = await this.landingPageRepositorio.create({ title, file: savedfilename, description, type: imageType });

        return this.dataResponse.dataReponse(201, 'Adicionado com sucesso', data)
      }
    } catch (error) {

      return this.dataResponse.dataReponse(500, 'ocorreu algum erro', error)
    }
  }
}

module.exports = LandingPageController
