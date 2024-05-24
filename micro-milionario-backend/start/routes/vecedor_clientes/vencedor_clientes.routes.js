module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("vencedor-cliente", "VencedorClienteController.index");
    Route.post("vencedor-cliente", "VencedorClienteController.store");
    Route.post("vencedor-cliente/listar", "VencedorClienteController.show");
    Route.post("vencedor-cliente/listarByVencedorCliente", "VencedorClienteController.showByVencedorCliente");
    Route.post("vencedor-cliente/listarById", "VencedorClienteController.showById");
    Route.post("vencedor-cliente/listarByUserId", "VencedorClienteController.showByUserId");
    Route.post('vencedor-cliente/update/:id', 'VencedorClienteController.update');
  })
}
