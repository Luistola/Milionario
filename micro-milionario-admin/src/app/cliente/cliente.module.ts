import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarteiraComponent } from '../carteira/carteira.component';
import { ShareModuloModule } from '../share-modulo/share-modulo.module';
import { ClienteComponent } from './cliente.component';


@NgModule({
  declarations: [ClienteComponent, CarteiraComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    ShareModuloModule
  ]
})
export class ClienteModule { }
