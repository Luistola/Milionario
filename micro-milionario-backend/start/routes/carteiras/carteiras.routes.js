module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("carteira", "CarteiraController.index");
    Route.post("carteira", "CarteiraController.store");
    Route.post("carteira/listar", "CarteiraController.show");
    Route.post("carteira/listarById", "CarteiraController.showById");
    Route.post("carteira/listarByUserId", "CarteiraController.showByUserId");
    Route.post('carteira/update/:id', 'CarteiraController.update');
  })
}
