module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.post("landingPage/add", "LandingPageController.add");
  })
}
