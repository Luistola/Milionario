import { EventoModalComponent } from './../modals/eventos/evento-modal/evento-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventoComponent } from './evento/evento.component';
import { EventosComponent } from './eventos.component';
import { ParticiparComponent } from './participar/participar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EventoComponent, EventosComponent, ParticiparComponent, EventoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventosRoutingModule
  ],
})
export class EventosModule { }
