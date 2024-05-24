module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.get("slide", "SlideController.index");
    Route.post("slide", "SlideController.store");
    Route.post("slide/listar", "SlideController.show");
    Route.post("slide/images", "ImageController.store");
    Route.post('slide/update/:id', 'SlideController.update');
    Route.post('slide/delete/:id', 'SlideController.delete');
  })
}
