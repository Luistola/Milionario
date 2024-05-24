import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistComponent } from './artist/artist.component';
import { ArtistsComponent } from './artists.component';
import { PerfilArtistComponent } from './perfil-artist/perfil-artist.component';
import { MusicaComponent } from './musica/musica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AlbumComponent } from './album/album.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ArtistComponent, ArtistsComponent, PerfilArtistComponent, MusicaComponent, AlbumComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistsRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ArtistsModule { }
