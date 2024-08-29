module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("concurso", "ConcursoController.index");
    Route.get("concurso_active", "ConcursoController.indexActive");
    Route.get("concurso_pure", "ConcursoController.indexPure");
    Route.get("concurso_qtd", "ConcursoController.showQtdConcurso");
    Route.post("concurso", "ConcursoController.store");
    Route.post("concurso/listar", "ConcursoController.show");
    Route.post("concurso/admin/listar", "ConcursoController.adminShow");
    Route.post("concurso/listarAlt", "ConcursoController.showAlt");
    Route.post("concurso/listarById", "ConcursoController.showById");
    Route.post("concurso/listarByDataFim", "ConcursoController.showByDataFim");
    Route.post("concurso/images", "ImageController.store");
    Route.post('concurso/update/:id', 'ConcursoController.update');
    Route.delete('concurso/delete/:id', 'ConcursoController.delete');

    Route.post("concurso/search/", "ConcursoController.search");
    Route.get("concurso/generateWinner/:id", "ConcursoController.generateWinner");

  })
}
