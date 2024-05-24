import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilizadorComponent } from './utilizador.component';


const routes: Routes = [
  {
    path: '',
    component: UtilizadorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilizadorRoutingModule { }
