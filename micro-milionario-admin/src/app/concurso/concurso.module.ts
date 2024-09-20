import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcursoRoutingModule } from './concurso-routing.module';
import { ParticipanteComponent } from '../participante/participante.component';
import { ConcursoComponent } from './concurso.component';
import { VotacaoComponent } from '../votacao/votacao.component';
import { NewConcursoModalComponent } from './new-concurso-modal/new-concurso-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModuloModule } from '../share-modulo/share-modulo.module';
import { EditConcursoComponent } from './edit-concurso/edit-concurso.component';
import { FormatDatePipe } from '../pipes/format-date.pipe';

@NgModule({
  declarations: [
    ConcursoComponent,
    ParticipanteComponent,
    NewConcursoModalComponent,
    EditConcursoComponent,
    FormatDatePipe,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConcursoRoutingModule,
    ShareModuloModule,

    // <--- Add .forRoot() here
  ],
  exports: [FormatDatePipe] // <--- Add this line
})
export class ConcursoModule { }