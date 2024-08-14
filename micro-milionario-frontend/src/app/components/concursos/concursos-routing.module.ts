import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcursosComponent } from './concursos.component';
import { ParticipantesComponent } from './participantes/participantes/participantes.component';


const routes: Routes = [
  {
    path: '',
    component: ConcursosComponent
  },
  {
    path: 'participantes/:id',
    component: ParticipantesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcursosRoutingModule { }
