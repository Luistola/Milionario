import { RoleGuardGuard } from './guards/role-guard.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { ContactComponent } from './contact/contact.component';
import { RecargaComponent } from './recarga/recarga.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { VencedoresComponent } from './vencedores/vencedores.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';


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
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'page403',
    component: Page404Component,
  },

  // Tela Principal
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuardGuard],
    children: [
      {
        path:'',
        component: HomeComponent
      },
      {
        path: 'artists',
        canActivate: [AuthGuardGuard],
        /* data: {
          expectedRoles: ['Cliente']
        }, */
        loadChildren: () => import('../app/artists/artists.module')
        .then(mModule => mModule.ArtistsModule)
      },
      {
        path: 'concursos',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/concursos/concursos.module')
        .then(mModule => mModule.ConcursosModule)
      },
      {
        path: 'eventos',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/eventos/eventos.module')
        .then(mModule => mModule.EventosModule)
      },
      {
        path: 'pagamento',
        canActivate: [AuthGuardGuard],
        loadChildren: () => import('../app/pagamento/pagamento.module')
        .then(mModule => mModule.PagamentoModule)
      },
      {
        path:'vencedores',
        canActivate: [AuthGuardGuard],
        component: VencedoresComponent
      },
      {
        path:'recarga',
        canActivate: [AuthGuardGuard],
        component: RecargaComponent
      },
      {
        path:'contact',
        canActivate: [AuthGuardGuard],
        component: ContactComponent
      },
      {
        path:'carteira',
        canActivate: [AuthGuardGuard],
        component: CarteiraComponent
      },
      {
        path:'perfil-cliente',
        canActivate: [AuthGuardGuard],
        component: PerfilClienteComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'page403'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
