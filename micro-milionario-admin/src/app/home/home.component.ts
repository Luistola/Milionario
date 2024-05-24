import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../service/upload/upload-file.service';
import { async } from '@angular/core/testing';
import { ArtistService } from '../service/artist/artist.service';
import { ClienteService } from '../service/cliente/cliente.service';
import { ConcursoService } from '../service/concurso/concurso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private filename = '1665874588985.png';
  isloading: boolean= false;
  totalConcurso;
  totalArtista;
  totalCliente;

  constructor(
    private uploadFileService: UploadFileService,
    private concursoService: ConcursoService,
    private artistService: ArtistService,
    private clienteService: ClienteService,
    ) { }

  ngOnInit() {
    this.listarQtdConcursos();
    this.listarQtdArtista();
    this.listarQtdCliente();
  }

  getImageUrl(){
    return this.uploadFileService.getImageUrl('/download/images/',this.filename);
  }

  async listarQtdConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarQtdConcurso().toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.totalConcurso= listagemConcurso.dados[0]
      console.log(listagemConcurso);
    }
  }

  async listarQtdArtista(){
    this.isloading= true
     const listagemArtista= await this.artistService.listarQtdArtista().toPromise();
     if(listagemArtista.code == 200){
       this.isloading= false;
      this.totalArtista= listagemArtista.dados[0]
      console.log(listagemArtista);
    }
  }

  async listarQtdCliente(){
    this.isloading= true
     const listagemCliente= await this.clienteService.listarQtdClinte().toPromise();
     if(listagemCliente.code == 200){
       this.isloading= false;
      this.totalCliente= listagemCliente.dados[0]
      console.log(listagemCliente);
    }
  }

}
