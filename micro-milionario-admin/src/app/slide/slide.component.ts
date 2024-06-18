import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FiltroClass } from '../service/geral/filtro-service';
import { MessageService } from '../service/message/message.service';
import { SlideService } from '../service/slide/slide.service';
import { UploadFileService } from '../service/upload/upload-file.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  slideLista: [];
  isloading: boolean= false;
  slideCarregar
  procurarItem:string
  slideBody;
  slideForm: FormGroup;
  fotoFile;
  files: Set<File>;
  slideSelecionado: any;

  constructor(
    public pagination: FiltroClass,
    private slideService: SlideService,
    private uploadFileService: UploadFileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    toast: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.files = new Set();
    this.slidePaginacao(this.pagination.pagination.page);
  }

  createForm(): void{
    this.slideForm = this.formBuilder.group({
      nome: [''],
    });
  }

  setSlide(): void{
    this.slideBody = {
      // nome: this.slideForm.get('nome').value,
      foto: this.fotoFile
    };

    console.log(this.slideBody);
  }

  async save(){
    this.setSlide();

    const slide = await this.slideService.post('/slide', this.slideBody).toPromise();
    if(slide.code == 200){
      await this.upload();
      this.toastr.success('Slide Salvo Com Sucesso!', 'Sucesso!');
      console.log(slide.message);
      this.slidePaginacao(this.pagination.pagination.page);
    }
   }

  async listarSlides(){
    this.isloading= true
     const listagemSlide= await this.slideService.listarSlides(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemSlide.code == 200){
      this.isloading= false;
      this.slideLista= listagemSlide.dados.data
      this.pagination.pagination.lastPage= listagemSlide.dados.lastPage;
      this.pagination.pagination.page= listagemSlide.dados.page;
      this.pagination.pagination.perPage= listagemSlide.dados.perPage;
      this.pagination.pagination.total = listagemSlide.dados.total;
      console.log(listagemSlide);
    }
  }

  slidePaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarSlides()
     }

   }

   onChangeFoto(event){

    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
    // console.log(selectedFiles[0]);
  }

  async upload(){
    if (this.files && this.files.size > 0) {
      await this.uploadFileService.upload('/concurso/images', this.files).toPromise();
    }
  }

  async apagarSlide(slide){
    await this.apagar(slide.id);
    this.slidePaginacao(this.pagination.pagination.page);
  }

  async apagar(id){

    const slide = await this.slideService.delete('/slide/delete/'+id).toPromise();
    if(slide.code == 200){
      console.log(slide.message);
      this.toastr.success(slide.message, 'Sucesso!');
    }
   }


   setSlideFoto(slide){
     console.log(slide);
    this.slideSelecionado = slide.foto;
  }

}
