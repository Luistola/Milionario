import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { EventosComponent } from './eventos.component';
import { ParticiparComponent } from './participar/participar.component';


const routes: Routes = [
  {
    path: '',
    component: EventosComponent
  },
  {
    path: 'evento/:id',
    component: EventoComponent
  },
  {
    path: 'participar/:id',
    component: ParticiparComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
