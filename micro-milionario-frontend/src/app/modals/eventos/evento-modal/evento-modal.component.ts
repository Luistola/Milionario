import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/service/artist/artist.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { MessageService } from 'src/app/service/message/message.service';
import { MusicService } from 'src/app/service/music/music.service';
import { ParticipanteService } from 'src/app/service/participante/participante.service';

@Component({
  selector: 'app-evento-modal',
  templateUrl: './evento-modal.component.html',
  styleUrls: ['./evento-modal.component.css']
})
export class EventoModalComponent implements OnInit {

  artistaId;
  artista;
  musicas;
  usuarioActual;

  @Input() concurso;
  musica = new FormControl();

  constructor(
    public pagination: FiltroClass,
    private auth: AuthService,
    private artistService: ArtistService,
    private musicService: MusicService,
    private participanteService: ParticipanteService,
    private router: Router,
    private toastr: ToastrService,
    toast: MessageService,
  ) {}

  ngOnInit() {
    this.getMusicaByArtist();
  }

  async getUser(){
    this.usuarioActual = await this.auth.getUser().toPromise();
    console.log(this.usuarioActual);
   }

  /* async getConcurso(concursoId){
    const concurso = await this.concursoService.listarById(concursoId).toPromise();
    if(concurso.code == 200){
      this.concurso = concurso.dados[0];
      console.log(this.concurso);
    }
   } */

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

   async save(){
    let body = {
      concurso_id: this.concurso.id,
      musica_id: this.musica.value
    }

    const participarConcurso = await this.participanteService.post('/participante', body).toPromise();
      if(participarConcurso.code == 200){
        console.log(participarConcurso.message);
        this.toastr.success(participarConcurso.message, 'Sucesso!');
      }
   }

}
