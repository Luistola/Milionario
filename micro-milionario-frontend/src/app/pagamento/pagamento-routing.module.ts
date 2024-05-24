import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagamentoComponent } from './pagamento.component';


const routes: Routes = [
  {
    path: '',
    component: PagamentoComponent
  },
  /* {
    path: 'artist/:id',
    component: ArtistComponent
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
