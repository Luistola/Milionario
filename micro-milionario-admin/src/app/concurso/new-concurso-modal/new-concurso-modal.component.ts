import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  imageReponse:any;
  concursoBody;
  fotoFile;
  concursoForm: FormGroup;
  files: Set<File>;
  @Output() eventoClicado = new EventEmitter();
  @ViewChild('closebutton', { static: false }) closebutton;
  @ViewChild('inputFile', { static: false }) fileInputRef: ElementRef;
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

  createForm(): void {
  this.concursoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    premio: new FormControl('', Validators.required),
    n_vencedor: new FormControl('', Validators.required),
    price_percent: new FormControl('', Validators.required),
    data_inicio: new FormControl('', [Validators.required,]),
    data_fim: new FormControl('', [Validators.required,]),
    foto: new FormControl('')
  });
}



  onChangeFoto(event) {

    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
    // console.log(selectedFiles[0]);
  }



  setConcurso(): void {
    this.concursoBody = {
      nome: this.concursoForm.get('nome').value,
      descricao: this.concursoForm.get('descricao').value,
      premio: this.concursoForm.get('premio').value,
      n_vencedor: this.concursoForm.get('n_vencedor').value,
      price_percent: this.concursoForm.get('price_percent').value,
      data_inicio: new Date(this.concursoForm.get('data_inicio').value).toISOString().split(".")[0],
      data_fim: new Date(this.concursoForm.get('data_fim').value).toISOString().split(".")[0],
      foto: this.imageReponse // set the foto property to the image response
    };
  }
 


  async save() {
    if (this.concursoForm.valid) {
     
      if (this.files && this.files.size > 0) {
        const imageApi = await this.uploadFileService.upload('/concurso/images', this.files).toPromise();
        if (imageApi.code === 200) {
          this.imageReponse = imageApi.data;
        } else {
          console.error(`Error uploading image: ${imageApi.mssage}`);
          return; // exit the function if image upload fails
        }
      }
  
      this.setConcurso();
      console.log("get contwest........",this.concursoBody);
      try {
        const concurso = await this.concursoService.post('/concurso', this.concursoBody).toPromise();
        if (concurso.code === 200) {
          this.emitirEvento();
          this.closebutton.nativeElement.click();
          this.toastr.success('Concurso Salvo Com Sucesso!', 'Sucesso!');
          console.log(concurso.message);
          this.createForm();
          this.files = new Set();
          this.limparInputFile();
        } else {
          console.error(`Error saving concurso: ${concurso.message}`);
        }
      } catch (error) {
        if (error.status === 409) {
          console.error('Concurso already exists:', error.error.message);
          this.toastr.error('Concurso já cadastrado, verifique os campos!', 'Erro!');
        } else {
          console.error('Error saving concurso:', error);
          this.toastr.error('Erro ao salvar concurso!', 'Erro!');
        }
      }
    } else {
      console.log('Form is invalid!');
    }
  }


  formataData(d) {
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
