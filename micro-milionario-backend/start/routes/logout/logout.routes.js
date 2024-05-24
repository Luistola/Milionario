module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.post("/logout", "AuthController.terminarSessao");
  })
}
