'use strict'
const Helpers = use('Helpers')
const Drive = use('Drive');

class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
   async store ({ request }) {
    const images = request.file('file')
    console.log(images.size);
    if (images.size > 0) {
      const type=request.file('file').subtype;
      const name= request.file('file').filename;
      console.log(Helpers.publicPath('uploads'));
      await images.move(Helpers.publicPath('uploads'), {
        name: name
      })

      if (!images.moved()) {
        return images.error()
      }else{
        console.log('Sucesso!');
      }
    } else {
      await images.moveAll(Helpers.publicPath('uploads'), (file) => {
        return {
          name: file.filename
        }
      })

      if (!images.movedAll()) {
        return images.errors()
      }else{
        console.log('Sucesso!');
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
