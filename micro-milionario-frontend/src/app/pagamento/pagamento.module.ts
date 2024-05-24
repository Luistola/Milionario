import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoComponent } from './pagamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagamentoRoutingModule
  ]
})
export class PagamentoModule { }
