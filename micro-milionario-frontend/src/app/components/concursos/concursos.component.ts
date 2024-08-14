import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-concursos',
  templateUrl: './concursos.component.html',
  styleUrls: ['./concursos.component.css']
})
export class ConcursosComponent implements OnInit {

 
  concursoLista;
  isloading: boolean= false;
  concursoCarregar
  procurarItem:string
  slideSelecionado: any;
  itemsToShow: number = 6;
  itemsToLoad: number = 6;

  constructor(
    public pagination: FiltroClass,
    private concursoService: ConcursoService,
    private router: Router,
    private uploadService: UploadFileService,
    private location: Location
    ) { }

  ngOnInit() {
    this.concursoPaginacao(1);
  }

  async listarConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursos1(this.procurarItem).toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados
    }
  }

   concursoPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarConcursos()
     }

   }

   loadMoreItems() {
    this.itemsToShow += this.itemsToLoad;
  }

   goParticipanteList(concurso){
    this.router.navigate(['/dashboard/concursos/participantes', concurso.id]);
    
   }

   getImageUrl(filename: string){
    return this.uploadService.getImageUrl('/download/images/',filename);
  }

  goBack(){
    this.location.back();
  }

  setFoto(slide){
   this.slideSelecionado = slide.foto;
 }


}
