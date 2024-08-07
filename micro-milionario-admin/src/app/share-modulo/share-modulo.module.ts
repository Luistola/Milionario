import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterpipePipe } from '../pipes/filterpipe.pipe';



@NgModule({
  declarations: [FilterpipePipe],
  imports: [
    CommonModule,
    // NgxPaginationModule
  ],
  exports: [
    NgxPaginationModule,FilterpipePipe
  ]
})
export class ShareModuloModule { }
