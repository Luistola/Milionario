import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcursosRoutingModule } from './concursos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConcursosComponent } from './concursos.component';
import { SharedModule } from '../shared/shared.module';
import { AddEntiresModalComponent } from './add-entires-modal/add-entires-modal.component';
import { VotoModalComponent } from './voto-modal/voto-modal.component';
import { ParticipantesComponent } from './participantes/participantes/participantes.component';

@NgModule({
  declarations: [ConcursosComponent, ParticipantesComponent, AddEntiresModalComponent, VotoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ConcursosRoutingModule
  ],
  exports: [AddEntiresModalComponent,VotoModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ConcursosModule { }