module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("participante", "ParticipanteController.index");
    Route.post("participante", "ParticipanteController.store");
    Route.post("participante/listar", "ParticipanteController.show");
    Route.post("participante/listarByConcurso", "ParticipanteController.showByConcurso");
    Route.post('participante/update/:id', 'ParticipanteController.update');
    Route.post('participante/delete/:id', 'ParticipanteController.delete');
  })
}
