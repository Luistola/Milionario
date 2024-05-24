module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("music", "MusicController.index");
    Route.post("music", "MusicController.store");
    Route.post("music/listar", "MusicController.show");
    Route.post("music/listarByArtist", "MusicController.showByArtist");
    Route.post("music/images", "ImageController.store");
    Route.get('music/download/:fileName','ImageController.download');
  })
}
