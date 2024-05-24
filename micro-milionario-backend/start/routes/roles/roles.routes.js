module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("role", "RoleController.index");
    Route.post("role", "RoleController.store");
    Route.post("role/listar", "RoleController.show");
    Route.put('role/update/:id', 'RoleController.update');
  })
}
