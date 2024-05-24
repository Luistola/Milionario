module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("votacao", "VotacaoController.index");
    Route.post("votacao", "VotacaoController.store");
    Route.post("votacao/listar", "VotacaoController.show");
    Route.post("votacao/listarByConcurso", "VotacaoController.showByConcurso");
    Route.post("votacao/listarByCliente", "VotacaoController.showByCliente");
    Route.post("votacao/listarTotalVotosByConcurso", "VotacaoController.showTotalVotosByConcurso");
  })
}
