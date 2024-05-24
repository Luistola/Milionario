import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteiraComponent } from '../carteira/carteira.component';
import { ClienteComponent } from './cliente.component';


const routes: Routes =
[
  {
    path: '',
    component: ClienteComponent
  },
  {
    path: 'carteira/:id',
    component: CarteiraComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
