"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

const { useContext } = require("node-context-hook");

(() => {
  const ApiRoute = (registerCallback, prefix = "", isAuth = true) => {
    const route = Route.group(registerCallback)
      .prefix(`api/v1/${prefix}`)
    /*   .middleware(["injectContext", "AddMetaDataToResponse"]); */

    if (isAuth) {
      /*    return route.middleware(["auth"]); */
    }

    return route;
  };

  const routes = useContext(__dirname + "/routes", true, /\.js$/);

  routes.keys().forEach((routePath) => {
    const routeModule = require(routePath);

    routeModule(ApiRoute, Route);
  });
})();


Route.get("/", () => {
  return { greeting: "Welcome to Microfone Milionário!" };
});

/* // Rotas Roles
Route.get("role", "RoleController.index");
Route.post("role", "RoleController.store");
Route.post("role/listar", "RoleController.show");
// Fim Rotas Roles

// Rotas Music
Route.get("music", "MusicController.index");
Route.post("music", "MusicController.store");
Route.post("music/listar", "MusicController.show");
Route.post("music/listarByArtist", "MusicController.showByArtist");
Route.post("music/images", "ImageController.store");
// Fim Rotas Music

// Rotas Artist
Route.get("artist", "ArtistController.index");
Route.post("artist", "ArtistController.store");
Route.post("artist/listar", "ArtistController.show");
Route.post("artist/listarById", "ArtistController.showById");
Route.post("artist/listarByUserId", "ArtistController.showByUserId");
// Fim Rotas Artist

// Rotas Cliente
Route.get("cliente", "ClienteController.index");
Route.post("cliente", "ClienteController.store");
Route.post("cliente/listar", "ClienteController.show");
Route.post("cliente/listarByUser", "ClienteController.showByUser");
// Fim Rotas Cliente

// Rotas Concurso
Route.get("concurso", "ConcursoController.index");
Route.post("concurso", "ConcursoController.store");
Route.post("concurso/listar", "ConcursoController.show");
Route.post("concurso/listarById", "ConcursoController.showById");
Route.post("concurso/images", "ImageController.store");
// Fim Rotas Concurso

// Rotas Votacao
Route.get("votacao", "VotacaoController.index");
Route.post("votacao", "VotacaoController.store");
Route.post("votacao/listar", "VotacaoController.show");
Route.post("votacao/listarByConcurso", "VotacaoController.showByConcurso");
// Fim Rotas Votacao

// Rotas Participante
Route.get("participante", "ParticipanteController.index");
Route.post("participante", "ParticipanteController.store");
Route.post("participante/listar", "ParticipanteController.show");
Route.post("participante/listarByConcurso", "ParticipanteController.showByConcurso");
// Fim Rotas Participante

// Rotas Pagamento
Route.get("pagamento", "PagamentoController.index");
Route.post("pagamento", "PagamentoController.store");
Route.post("pagamento/listar", "PagamentoController.show");
Route.get("pagamento/showLastId", "PagamentoController.showLastId");
// Fim Rotas Pagamento

// Rotas PagamentoRecarga
Route.get("pagamento-recarga", "PagamentoRecargaController.index");
Route.post("pagamento-recarga", "PagamentoRecargaController.store");
Route.post("pagamento-recarga/listar", "PagamentoRecargaController.show");
// Route.post("pagamento-recarga/listarByConcurso", "PagamentoRecargaController.showByConcurso");
// Fim Rotas PagamentoRecarga
 */
/* Route.group(() => {
  Route.post("/logout", "AuthController.terminarSessao");

  }).middleware("auth"); */
