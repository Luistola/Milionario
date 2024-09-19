import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { ArtistService } from 'src/app/service/artist/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  
  artistaLista: any[]=[];
  isloading: boolean= false;
  artistaCarregar
  procurarItem:string
  fileSrv = environment.fileServer;
  image


  constructor(
    public pagination: FiltroClass,
    private artistService: ArtistService,
    private uploadService: UploadFileService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.artistaPaginacao(1);

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

   artistaPaginacao1(page:number): void{

    if(this.pagination.pagination.page == null){
      this.pagination.pagination.perPage=+page;
    }else{
      this.pagination.pagination.page= page
      this.listarArtistas()
    }

  }

   goArtist(artista){
    this.router.navigate(['/dashboard/artists/artist', artista.id]);
   }

   getImageUrl(filename: string){
    return this.uploadService.getImageUrl('/download/images/',filename);
  }

  goBack(){
    this.location.back();
  }

}
