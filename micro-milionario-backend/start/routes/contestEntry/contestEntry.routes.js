module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.post("contestEntry/create", "ContestEntryController.create");
  })
}
