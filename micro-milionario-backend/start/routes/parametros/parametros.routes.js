module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("parametro", "ParametroController.index");
    Route.post("parametro", "ParametroController.store");
    Route.post("parametro/listar", "ParametroController.show");
    Route.post("parametro/listarById", "ParametroController.showById");
    Route.post("parametro/listarByUserId", "ParametroController.showByUserId");
    Route.post('parametro/update/:id', 'ParametroController.update');
  })
}
