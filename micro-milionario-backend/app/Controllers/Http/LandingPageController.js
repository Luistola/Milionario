"use strict";
const Helpers = use("Helpers");
const Drive = use("Drive");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const LandingPageRepositorio = use(
  "App/Repositorio/Admin/LandingPageRepositorio"
);
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
      const image = request.file("file");

      let savedfilename = "";
      let imageType = "";
      if (image) {
        console.log("file: LandingPageController.js:30 ~ image:", image);
        imageType = request.file("file").type;
        const fileName = request.file("file").clientName;
        const timestamp = Date.now();
        // console.log(Helpers.publicPath("uploads"));
        await image?.move(Helpers.publicPath("uploads"), {
          name: timestamp + fileName,
        });

        if (!image.moved()) {
          return image.error();
        } else {
          console.log("Sucesso!");
          savedfilename = timestamp + fileName;
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
          console.log(
            "file: LandingPageController.js:62 ~ existingData.file:",
            existingData.file
          );
          const filePath = Helpers.publicPath(`uploads/${existingData.file}`);

          existingData.file = savedfilename;
          existingData.type = imageType;

          try {
            await Drive.delete(filePath);
            console.log("File deleted successfully");
          } catch (error) {
            console.log("file: LandingPageController.js:73 ~ error:", error);
            console.log("File not deleted", error);
          }
        }

        let data = await this.landingPageRepositorio.updateById(
          existingData.id,
          existingData
        );

        return this.dataResponse.dataReponse(
          202,
          "Atualizado com sucesso",
          data
        );
      } else {
        let data = await this.landingPageRepositorio.create({
          title,
          file: savedfilename,
          description,
          type: imageType,
        });

        return this.dataResponse.dataReponse(
          201,
          "Adicionado com sucesso",
          data
        );
      }
    } catch (error) {
      console.log("file: LandingPageController.js:73 ~ error:", error);

      return this.dataResponse.dataReponse(500, "ocorreu algum erro", error);
    }
  }

  async read({ request }) {
    try {
      let existingDatas = await this.landingPageRepositorio.getAll();

      if (existingDatas && existingDatas?.length) {
        let existingData = existingDatas[0];

        return this.dataResponse.dataReponse(
          200,
          "dados obtidos com sucesso",
          existingData
        );
      } else {
        return this.dataResponse.dataReponse(404, "Dados não encontrados");
      }
    } catch (error) {
      console.log("file: LandingPageController.js:94 ~ error:", error);
      return this.dataResponse.dataReponse(500, "ocorreu algum erro", error);
    }
  }
}

module.exports = LandingPageController;
