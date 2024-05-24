module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("movimento", "MovimentoController.index");
    Route.post("movimento", "MovimentoController.store");
    Route.post("movimento/listar", "MovimentoController.show");
    Route.post("movimento/listarById", "MovimentoController.showById");
    Route.post("movimento/listarByUserId", "MovimentoController.showByUserId");
    Route.put('movimento/update/:id', 'MovimentoController.update');
  })
}
