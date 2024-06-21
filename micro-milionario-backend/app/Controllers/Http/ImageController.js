'use strict'
const Helpers = use('Helpers')
const Drive = use('Drive');

class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store({ request }) {

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

          return {
            mssage: "Sucesso",
            data: savedfilename,
            code: 200,
          };
      }
    }
  }

  async download ({ params, response }) {
    const filePath = `uploads/${params.fileName}`;
    console.log(filePath);
    const isExist = await Drive.exists(filePath);
    if (isExist) {
        return response.download(Helpers.publicPath(filePath));
    }
    return 'File does not exist';
  }
}

module.exports = ImageController
