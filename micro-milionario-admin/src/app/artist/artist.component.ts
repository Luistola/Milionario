import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from '../service/artist/artist.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistaLista: [];
  isloading: boolean= false;
  artistaCarregar
  artistaSelecionado
  procurarItem:string

  constructor(
    public pagination: FiltroClass,
    private artistService: ArtistService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.artistaPaginacao(this.pagination.pagination.page);
  }

  async listarArtistas(){
    this.isloading= true
     const listagemArtista= await this.artistService.listarArtistas(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemArtista.code == 200){
       this.isloading= false;
      this.artistaLista= listagemArtista.dados.data
      this.pagination.pagination.lastPage= listagemArtista.dados.lastPage;
      this.pagination.pagination.page= listagemArtista.dados.page;
      this.pagination.pagination.perPage= listagemArtista.dados.perPage;
      this.pagination.pagination.total = listagemArtista.dados.total;
      console.log(listagemArtista);
    }
  }

   artistaPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarArtistas()
     }

   }

   goMusicaList(artist){
     console.log(artist);
    this.router.navigate(['/dashboard/artists/musica', artist.id]);
   }

   setArtista(artista){
    this.artistaSelecionado = artista;
  }

  async apagarArtista(artista){
    await this.apagar(artista.id);
    this.artistaPaginacao(this.pagination.pagination.page);
  }

  async apagar(id){

    const artista = await this.artistService.delete('/artist/delete/'+id).toPromise();
    if(artista.code == 200){
      console.log(artista.message);
      this.toastr.success(artista.message, 'Sucesso!');
    }
   }

}
