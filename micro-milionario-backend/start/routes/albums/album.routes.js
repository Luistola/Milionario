module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("album", "AlbumController.index");
    Route.post("album", "AlbumController.store");
    Route.post("album/listar", "AlbumController.show");
    Route.post("album/listarByArtist", "AlbumController.showByArtist");
    Route.post("album/listarById", "AlbumController.showById");
    Route.post("album/listarByUserId", "AlbumController.showByUserId");
  })
}
