module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.post("contestEntry/create", "ContestEntryController.create");
    Route.get("contestEntry/read", "ContestEntryController.read");
    Route.get("contestEntry/artist/:id", "ContestEntryController.getByArtistId");
    Route.post("contestEntry/update/:id", "ContestEntryController.update");
  })
}
