module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("contacto", "ContactoController.index");
    Route.post("contacto", "ContactoController.store");
    Route.post("contacto/listar", "ContactoController.show");
    Route.post('contacto/update/:id', 'ContactoController.update');
    Route.post('contacto/delete/:id', 'ContactoController.delete');
  })
}
