module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("cliente", "ClienteController.index");
    Route.get("cliente/:id", "ClienteController.getClientById");
    Route.get("cliente_qtd", "ClienteController.showQtdCliente");
    Route.post("cliente", "ClienteController.store");
    Route.post("cliente/listar", "ClienteController.show");
    Route.post("cliente/listarByUser", "ClienteController.showByUser");
    Route.post('cliente/update/:id', 'ClienteController.update');
    Route.post('cliente/delete/:id', 'ClienteController.delete');
  })
}
