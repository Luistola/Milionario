import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { MessageService } from 'src/app/service/message/message.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

@Component({
  selector: 'app-new-concurso-modal',
  templateUrl: './new-concurso-modal.component.html',
  styleUrls: ['./new-concurso-modal.component.css']
})
export class NewConcursoModalComponent implements OnInit {

  concursoBody;
  fotoFile;
  concursoForm: FormGroup;
  files: Set<File>;
  @Output() eventoClicado = new EventEmitter();
  @ViewChild('closebutton', {static: false}) closebutton;
  @ViewChild('inputFile', {static: false}) fileInputRef: ElementRef;
  dataFormatada;



  constructor(
    private formBuilder: FormBuilder,
    private concursoService: ConcursoService,
    private uploadFileService: UploadFileService,
    private toastr: ToastrService,
    toast: MessageService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.createForm();
    this.files = new Set();

  }

  emitirEvento() {
    this.eventoClicado.emit();
  }

  createForm(): void{
    this.concursoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      premio: [''],
      n_vencedor: [''],
      data_inicio: [''],
      data_fim:['']
    });
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

   async save(){
    this.setConcurso();

    const concurso = await this.concursoService.post('/concurso', this.concursoBody).toPromise();
    if(concurso.code == 200){
      await this.upload();
      this.emitirEvento();
      this.closebutton.nativeElement.click();
      this.toastr.success('Concurso Salvo Com Sucesso!', 'Sucesso!');
      console.log(concurso.message);
      this.createForm();
      this.files = new Set();
      this.limparInputFile();
    }
   }

  formataData(d){
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    this.dataFormatada = curr_year + "-" + curr_month + "-" + curr_date;
    console.log(this.dataFormatada);
  }

  limparInputFile() {
    this.fileInputRef.nativeElement.value = '';
  }


}
