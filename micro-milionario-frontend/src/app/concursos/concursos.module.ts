import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcursosRoutingModule } from './concursos-routing.module';
import { ConcursosComponent } from './concursos.component';
import { ConcursoComponent } from './concurso/concurso.component';
import { VotoModalComponent } from './voto-modal/voto-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerFotoComponent } from '../modals/ver-foto/ver-foto.component';
import { SharedModule } from '../shared/shared.module';
import { AddEntiresModalComponent } from './add-entires-modal/add-entires-modal.component';


@NgModule({
  declarations: [ConcursosComponent, ConcursoComponent, VotoModalComponent, AddEntiresModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ConcursosRoutingModule,
    
  ],
  exports:[AddEntiresModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ConcursosModule { }
