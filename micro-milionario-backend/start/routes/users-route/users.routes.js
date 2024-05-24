module.exports = (ApiRoute, Route) => {
    ApiRoute(() => {
        Route.post("/register", "AuthController.register");
        Route.post("/authenticate", "AuthController.authenticate");
        Route.get("/getUser", "AuthController.getUser");
        Route.post("user/listar", "AuthController.show");
        Route.post("user/listar_user_by_phone", "AuthController.findUserByPhone");
        Route.post('user/update/:id', 'AuthController.update');
        Route.post('user/delete/:id', 'AuthController.delete');
    })
  }



