import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from 'src/app/service/artist/artist.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { MusicService } from 'src/app/service/music/music.service';

@Component({
  selector: 'app-participar',
  templateUrl: './participar.component.html',
  styleUrls: ['./participar.component.css']
})
export class ParticiparComponent implements OnInit {

  concursoId;
  artista;
  musicas;
  usuarioActual;
  concurso: any;

  constructor(
    public pagination: FiltroClass,
    private auth: AuthService,
    private artistService: ArtistService,
    private concursoService: ConcursoService,
    private musicService: MusicService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
    });

    this.getConcurso(this.concursoId);
    this.getMusicaByArtist();
  }

  async getUser(){
    this.usuarioActual = await this.auth.getUser().toPromise();
    console.log(this.usuarioActual);
   }

  async getConcurso(concursoId){
    const concurso = await this.concursoService.listarById(concursoId).toPromise();
    if(concurso.code == 200){
      this.concurso = concurso.dados[0];
      console.log(this.concurso);
    }
   }

   async getArtista(){
    await this.getUser();
    const artista = await this.artistService.listarByUserId(this.usuarioActual.id).toPromise();
    if(artista.code == 200){
      this.artista = artista.dados[0];
      console.log(this.artista);
    }
   }

   async getMusicaByArtist(){
    await this.getArtista();
    const musica = await this.musicService.listarByArtist(this.artista.id).toPromise();
    if(musica.code == 200){
      this.musicas = musica.dados;
      console.log(this.musicas);
    }
   }

}
