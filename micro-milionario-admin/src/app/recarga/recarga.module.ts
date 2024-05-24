import { NewRecargaModalComponent } from './new-recarga-modal/new-recarga-modal.component';
import { RecargaComponent } from './recarga.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecargaRoutingModule } from './recarga-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModuloModule } from '../share-modulo/share-modulo.module';

@NgModule({
  declarations: [RecargaComponent, NewRecargaModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecargaRoutingModule,
    ShareModuloModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RecargaModule { }
