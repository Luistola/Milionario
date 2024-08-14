import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerFotoComponent } from '../ver-foto/ver-foto.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [VerFotoComponent],
  imports: [
    CommonModule,
  ],
  exports: [VerFotoComponent,NgxPaginationModule],
})
export class SharedModule { }