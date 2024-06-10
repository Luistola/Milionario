module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("artist", "ArtistController.index");
    Route.get("artist_qtd", "ArtistController.showQtdArtista");
    Route.post("artist", "ArtistController.store");
    Route.post("artist/listar", "ArtistController.show");
    Route.post("artist/listarById", "ArtistController.showById");
    Route.post("artist/listarByUserId", "ArtistController.showByUserId");
    Route.post("artist/images", "ImageController.store");
    Route.post('artist/update/:id', 'ArtistController.updateArtist');
    Route.post('artist/delete/:id', 'ArtistController.delete');
    Route.get('artist/:id', 'ArtistController.getArtistById');
  })
}
