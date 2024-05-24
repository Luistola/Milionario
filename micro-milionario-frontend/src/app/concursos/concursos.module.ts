import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcursosRoutingModule } from './concursos-routing.module';
import { ConcursosComponent } from './concursos.component';
import { ConcursoComponent } from './concurso/concurso.component';
import { VotoModalComponent } from './voto-modal/voto-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerFotoComponent } from '../modals/ver-foto/ver-foto.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ConcursosComponent, ConcursoComponent, VotoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ConcursosRoutingModule
  ]
})
export class ConcursosModule { }
