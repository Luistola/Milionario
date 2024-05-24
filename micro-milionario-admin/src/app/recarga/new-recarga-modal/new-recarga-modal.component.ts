import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecargaService } from 'src/app/service/recarga/recarga.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

@Component({
  selector: 'app-new-recarga-modal',
  templateUrl: './new-recarga-modal.component.html',
  styleUrls: ['./new-recarga-modal.component.css']
})
export class NewRecargaModalComponent implements OnInit {

  recargaBody;
  recargaForm: FormGroup;
  fotoFile;
  files: Set<File>;

  constructor(
    private formBuilder: FormBuilder,
    private recargaService: RecargaService,
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit() {
    this.createForm();

    this.files = new Set();
  }

  createForm(): void{
    this.recargaForm = this.formBuilder.group({
      nome: [''],
      preco: [''],
      tipo:[''],
      data_validade:[''],
      quantidade:['']
    });
  }

  onChangeFoto(event){

    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);

  }

  setRecarga(): void{
    this.recargaBody = {
      nome: this.recargaForm.get('nome').value,
      preco: this.recargaForm.get('preco').value,
      tipo: this.recargaForm.get('tipo').value,
      data_validade: this.recargaForm.get('data_validade').value,
      quantidade: this.recargaForm.get('quantidade').value,
      foto: this.fotoFile
    };

    console.log(this.recargaBody);
  }

  async upload(){
    if (this.files && this.files.size > 0) {
      await this.uploadFileService.upload('/recarga/images', this.files).toPromise();
    }
  }

  async save(){
    this.setRecarga();

    const recarga = await this.recargaService.post('/recarga', this.recargaBody).toPromise();
    if(recarga.code == 200){
      console.log(recarga.message);
      await this.upload();
    }
   }

}
