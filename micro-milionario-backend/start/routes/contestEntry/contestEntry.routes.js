module.exports = (ApiRoute, Route) => {
  ApiRoute(() => {
    Route.post("contestEntry/create", "ContestEntryController.create");
    Route.post("contestEntry/read", "ContestEntryController.read");
    Route.get(
      "contestEntry/artist/:id",
      "ContestEntryController.getByArtistId"
    );
    Route.get(
      "contestEntry/contest/:id",
      "ContestEntryController.getByContestId"
    );
    Route.get(
      "contestEntry/admin/contest/:id",
      "ContestEntryController.adminGetByContestId"
    );
    Route.get("contestEntry/search/", "ContestEntryController.search");
    Route.get("contestEntry/:id", "ContestEntryController.getById");
    Route.post("contestEntry/update/:id", "ContestEntryController.update");
    Route.delete("contestEntry/delete/:id", "ContestEntryController.delete");

    Route.post("contestEntry/give-vote/:id", "ContestEntryController.addVote");

  });
};
