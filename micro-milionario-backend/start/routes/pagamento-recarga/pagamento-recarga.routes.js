module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("pagamento-recarga", "PagamentoRecargaController.index");
    Route.post("pagamento-recarga", "PagamentoRecargaController.store");
    Route.post("pagamento-recarga/listar", "PagamentoRecargaController.show");
  })
}
