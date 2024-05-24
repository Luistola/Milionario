module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("vencedor", "VencedorController.index");
    Route.post("vencedor", "VencedorController.store");
    Route.post("vencedor/listar", "VencedorController.show");
    Route.post("vencedor/listarByVencedor", "VencedorController.showByVencedor");
    Route.post("vencedor/listarById", "VencedorController.showById");
    Route.post("vencedor/listarByUserId", "VencedorController.showByUserId");
    Route.post('vencedor/update/:id', 'VencedorController.update');
  })
}
