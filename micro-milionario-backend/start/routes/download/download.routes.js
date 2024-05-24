const Helpers = use('Helpers')

module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get('download/images/:filename', async ({ params, response }) => {
      const path = Helpers.publicPath(`uploads/${params.filename}`)
      return response.download(path)
    })
  })
}
