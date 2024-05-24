import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { MusicaService } from 'src/app/service/musica/musica.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musicaLista;
  isloading: boolean= false;
  musicaCarregar
  artistId;
  usuarioActual;
  userLogado

  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private musicaService: MusicaService,
    // private auth: AuthService,
    // private votacaoService: VotacaoService,
    // private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.artistId = paramMap.get('id');
    });

    this.musicaPaginacao(1);
    // this.getCliente();
  }

  async listarMusica(){
    this.isloading= true
     const listagemMusica= await this.musicaService.listarByArtist(this.artistId).toPromise();
     if(listagemMusica.code == 200){
       this.isloading= false;
      this.musicaLista= listagemMusica.dados
      this.pagination.pagination.lastPage= listagemMusica.dados.lastPage;
      this.pagination.pagination.page= listagemMusica.dados.page;
      this.pagination.pagination.perPage= listagemMusica.dados.perPage;
      this.pagination.pagination.total = listagemMusica.dados.total;
      console.log(listagemMusica);
    }
  }

   musicaPaginacao(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarMusica()
     }

   }

}
