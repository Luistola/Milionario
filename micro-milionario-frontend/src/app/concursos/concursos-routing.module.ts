import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcursoComponent } from './concurso/concurso.component';
import { ConcursosComponent } from './concursos.component';


const routes: Routes = [
  {
    path: '',
    component: ConcursosComponent
  },
  {
    path: 'concurso/:id',
    component: ConcursoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcursosRoutingModule { }
