import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistComponent } from './artist.component';
import { MusicaComponent } from './musica/musica.component';


const routes: Routes = [
  {
    path: '',
    component: ArtistComponent
  },
  {
    path: 'musica/:id',
    component: MusicaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
