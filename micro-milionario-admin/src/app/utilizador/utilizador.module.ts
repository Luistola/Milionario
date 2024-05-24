import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilizadorRoutingModule } from './utilizador-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModuloModule } from '../share-modulo/share-modulo.module';
import { NewUtilizadorModalComponent } from './new-utilizador-modal/new-utilizador-modal.component';
import { UtilizadorComponent } from './utilizador.component';


@NgModule({
  declarations: [UtilizadorComponent, NewUtilizadorModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilizadorRoutingModule,
    ShareModuloModule
  ]
})
export class UtilizadorModule { }
