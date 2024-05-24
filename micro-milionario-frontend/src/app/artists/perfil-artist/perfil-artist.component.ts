import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from 'src/app/service/artist/artist.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-artist',
  templateUrl: './perfil-artist.component.html',
  styleUrls: ['./perfil-artist.component.css']
})
export class PerfilArtistComponent implements OnInit {

  artistaId;
  artista;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.artistaId = paramMap.get('id');
    });

    this.getArtista(this.artistaId);
  }

  async getArtista(artistaId){
    const artista = await this.artistService.listarById(artistaId).toPromise();
    if(artista.code == 200){
      this.artista = artista.dados[0];
      console.log(this.artista);
    }
   }

   goToPerfil(){

   }

  goToMusica(){
    this.router.navigate(['/dashboard/artists/musica', this.artistaId]);
  }

  goBack(){
    this.location.back();
  }

}
