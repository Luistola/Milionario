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
  searchTerm;

  constructor(
    public pagination: FiltroClass,
    private artistService: ArtistService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.artistaPaginacao(this.pagination.pagination.page);
  }


  clearSearch() {
    document.getElementById('serachPag').style.display='none';
    document.getElementById('artistList').style.display='block';
    this.searchTerm = '';
    this.artistaPaginacao(this.pagination.pagination.page);
  }


  search(){
    document.getElementById('artistList').style.display='none';
    document.getElementById('serachPag').style.display='block';
    this.serachPaginacao(1);
    
  }

  async searchArtistas(){
     const listagemArtista= await this.artistService.getSreachByArtist(this.pagination.pagination, this.searchTerm).toPromise();
     if(listagemArtista.code == 200){
      this.artistaLista= listagemArtista.dados.data
      this.pagination.pagination.lastPage= listagemArtista.dados.lastPage;
      this.pagination.pagination.page= listagemArtista.dados.page;
      this.pagination.pagination.perPage= listagemArtista.dados.perPage;
      this.pagination.pagination.total = listagemArtista.dados.total;
      console.log(listagemArtista);
    }
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
       this.listarArtistas()
     }else{
       this.pagination.pagination.page= page
       this.listarArtistas()
     }

   }


   serachPaginacao(page:number): void{

    if(this.pagination.pagination.page == null){
      this.pagination.pagination.page=1;
      this.searchArtistas()
    }else{
      this.pagination.pagination.page= page
      this.searchArtistas()
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
