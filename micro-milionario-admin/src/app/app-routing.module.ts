import { VotacaoComponent } from './votacao/votacao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { VencedorParticipanteComponent } from './vencedor-participante/vencedor-participante.component';
import { ParametroComponent } from './parametro/parametro.component';
import { SlideComponent } from './slide/slide.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PousarComponent } from './pousar/pousar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'page404',
    component: Page404Component,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path:'',
        component: HomeComponent,
        pathMatch: "full"
      },
      {
        path:'artists',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/artist/artist.module')
        .then(mModule => mModule.ArtistModule)
      },
      {
        path:'cliente',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/cliente/cliente.module')
        .then(mModule => mModule.ClienteModule)
      },
      {
        path: 'concurso',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/concurso/concurso.module')
        .then(mModule => mModule.ConcursoModule)
      },
      {
        path:'recarga',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/recarga/recarga.module')
        .then(mModule => mModule.RecargaModule)
      },
      {
        path:'votacao',
        canActivate: [AuthGuardGuard],
        component: VotacaoComponent
      },
      {
        path:'vencedores',
        canActivate: [AuthGuardGuard],
        component: VencedorParticipanteComponent
      },
      {
        path: 'utilizadores',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/utilizador/utilizador.module')
        .then(mModule => mModule.UtilizadorModule)
      },
      {
        path:'parametros',
        canActivate: [AuthGuardGuard],
        component: ParametroComponent
      },
      {
        path:'pousar',
        canActivate: [AuthGuardGuard],
        component: PousarComponent
      },
      {
        path:'slide',
        canActivate: [AuthGuardGuard],
        component: SlideComponent
      },
      {
        path:'contacto',
        canActivate: [AuthGuardGuard],
        component: ContactoComponent
      },
    
      {
        path:'pousar',
        canActivate: [AuthGuardGuard],
        component: PousarComponent
      }
      /* {
        path: 'configuracoes-gerais',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/configuracoes-gerais/configuracoes-gerais.module')
        .then(mModule => mModule.ConfiguracoesGeraisModule)
      } */
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
