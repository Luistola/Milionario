import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticipanteComponent } from '../participante/participante.component';
import { ConcursoComponent } from './concurso.component';
import { EditConcursoComponent } from './edit-concurso/edit-concurso.component';


const routes: Routes = [
  {
    path: '',
    component: ConcursoComponent
  },
  {
    path: 'participante/:id',
    component: ParticipanteComponent
  },
  {
    path: 'editar/:id',
    component: EditConcursoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcursoRoutingModule { }
