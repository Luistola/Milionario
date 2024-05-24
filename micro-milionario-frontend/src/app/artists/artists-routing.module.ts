import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistsComponent } from './artists.component';
import { MusicaComponent } from './musica/musica.component';
import { PerfilArtistComponent } from './perfil-artist/perfil-artist.component';


const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent
  },
  {
    path: 'artist/:id',
    component: ArtistComponent
  },
  {
    path: 'perfil-artist/:id',
    component: PerfilArtistComponent
  },
  {
    path: 'musica/:id',
    component: MusicaComponent
  },
  {
    path: 'album/:id',
    component: AlbumComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
