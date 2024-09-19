import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerFotoComponent } from '../ver-foto/ver-foto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormatDatePipe } from 'src/app/pipes/format-date.pipe';


@NgModule({
  declarations: [VerFotoComponent,FormatDatePipe],
  imports: [
    CommonModule,
  ],
  exports: [VerFotoComponent,NgxPaginationModule,FormatDatePipe],
})
export class SharedModule { }