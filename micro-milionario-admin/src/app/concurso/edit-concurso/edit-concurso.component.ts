import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { MessageService } from 'src/app/service/message/message.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-concurso',
  templateUrl: './edit-concurso.component.html',
  styleUrls: ['./edit-concurso.component.css']
})
export class EditConcursoComponent implements OnInit {

  concursoBody;
  fotoFile;
  concursoForm: FormGroup;
  files: Set<File>;
  dataFormatada;
  concursoId
  concurso: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private concursoService: ConcursoService,
    private uploadFileService: UploadFileService,
    private toastr: ToastrService,
    toast: MessageService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
    });
    this.getConcursoById(this.concursoId);
    this.createForm();
    this.files = new Set();

  }

  createForm(): void{
    console.log('1');
    this.concursoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      premio: [''],
      n_vencedor: [''],
      data_inicio: [''],
      data_fim:['']
    });
  }

  async getConcursoById(data){
    const concurso = await this.concursoService.listarConcursoById(data).toPromise();
    if(concurso.code == 200){
      this.concurso = concurso.dados[0];
      console.log(this.concurso);
      // this.createForm();
      this.preencherData();
      // this.preencherDataFim();
    }
   }

   preencherData(){

    this.concursoForm.get('nome').setValue(this.concurso.nome);
    this.concursoForm.get('descricao').setValue(this.concurso.descricao);
    this.concursoForm.get('premio').setValue(this.concurso.premio);
    this.concursoForm.get('n_vencedor').setValue(this.concurso.n_vencedor);

    this.formataData(this.concurso.data_inicio);
    this.concursoForm.get('data_inicio').setValue(this.dataFormatada);
    this.formataData(this.concurso.data_fim)
    this.concursoForm.get('data_fim').setValue(this.dataFormatada);

    this.fotoFile = this.concurso.foto
   }

  onChangeFoto(event){

    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
    // console.log(selectedFiles[0]);
  }

  setConcurso(): void{
    this.concursoBody = {
      nome: this.concursoForm.get('nome').value,
      descricao: this.concursoForm.get('descricao').value,
      premio: this.concursoForm.get('premio').value,
      n_vencedor: this.concursoForm.get('n_vencedor').value,
      data_inicio: this.concursoForm.get('data_inicio').value,
      data_fim: this.concursoForm.get('data_fim').value,
      foto: this.fotoFile
    };

    console.log(this.concursoBody);
  }

  async upload(){
    if (this.files && this.files.size > 0) {
      await this.uploadFileService.upload('/concurso/images', this.files).toPromise();
    }
  }

  async update(){
    this.setConcurso();
    const concurso = await this.concursoService.update('/concurso/update/'+this.concursoId, this.concursoBody).toPromise();
    if(concurso.code == 200){
      await this.upload();
      this.toastr.success(concurso.message, 'Sucesso!');
      this.goBack();

    }
  }

  formataData(d){
    let date = new Date(d);
    var curr_date = date.getDate();
    var curr_month = (date.getMonth() + 1).toString().padStart(2, '0'); //Months are zero based
    var curr_year = date.getFullYear();
    this.dataFormatada = curr_year + "-" + curr_month + "-" + curr_date;
    console.log(this.dataFormatada);
  }

  goBack(){
    this.location.back();
  }

}
