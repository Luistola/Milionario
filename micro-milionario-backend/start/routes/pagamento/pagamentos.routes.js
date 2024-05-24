module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("pagamento", "PagamentoController.index");
    Route.post("pagamento", "PagamentoController.store");
    Route.post("pagamento/listar", "PagamentoController.show");
    Route.get("pagamento/showLastId", "PagamentoController.showLastId");
  })
}
