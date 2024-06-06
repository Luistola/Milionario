module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.post("landingPage/add", "LandingPageController.add");
    Route.get("landingPage/read", "LandingPageController.read");
  })
}
