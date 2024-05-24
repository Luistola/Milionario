module.exports = (ApiRoute, Route) => {
    ApiRoute(() => {
        Route.get("recarga", "RecargaController.index");
        Route.post("recarga", "RecargaController.store");
        Route.post("recarga/listar", "RecargaController.show");
        Route.post("recarga/images", "ImageController.store");
    })
  }



