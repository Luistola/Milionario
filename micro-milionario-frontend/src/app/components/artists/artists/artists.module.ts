import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ArtistsComponent } from './artists.component';
import { ArtistComponent } from '../artist/artist/artist.component';


@NgModule({
  declarations: [ArtistsComponent,ArtistComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistsRoutingModule,
    SharedModule,
   // NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ArtistsModule { }
