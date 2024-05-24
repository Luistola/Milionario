import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { MusicaComponent } from './musica/musica.component';
import { ShareModuloModule } from '../share-modulo/share-modulo.module';
import { ParticiparConcursoModalComponent } from './participar-concurso-modal/participar-concurso-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ArtistComponent, MusicaComponent, ParticiparConcursoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistRoutingModule,
    ShareModuloModule
  ]
})
export class ArtistModule { }
