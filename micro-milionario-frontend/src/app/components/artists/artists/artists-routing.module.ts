import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { ArtistComponent } from '../artist/artist/artist.component';


const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent
  },
  {
    path: 'artist/:id',
    component: ArtistComponent
  },
  // {
  //   path: 'perfil-artist/:id',
  //   component: PerfilArtistComponent
  // },
  // {
  //   path: 'musica/:id',
  //   component: MusicaComponent
  // },
  // {
  //   path: 'album/:id',
  //   component: AlbumComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
