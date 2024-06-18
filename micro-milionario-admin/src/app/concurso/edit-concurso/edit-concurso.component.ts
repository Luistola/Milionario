import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

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
  concursoId;
  concurso: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private concursoService: ConcursoService,
    private uploadFileService: UploadFileService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
    });
    this.getConcursoById(this.concursoId);
    this.createForm();
    this.files = new Set();
  }

  createForm(): void {
    this.concursoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      premio: ['', Validators.required],
      n_vencedor: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_fim: ['', Validators.required]
    });
  }

  async getConcursoById(data) {
    const concurso = await this.concursoService.listarConcursoById(data).toPromise();
    if (concurso.code == 200) {
      this.concurso = concurso.dados[0];
      this.preencherData();
    }
  }

  preencherData() {
    this.concursoForm.patchValue({
      nome: this.concurso.nome,
      descricao: this.concurso.descricao,
      premio: this.concurso.premio,
      n_vencedor: this.concurso.n_vencedor,
      data_inicio: this.formatDate(this.concurso.data_inicio),
      data_fim: this.formatDate(this.concurso.data_fim)
    });
    this.fotoFile = this.concurso.foto;
  }

  onChangeFoto(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
  }

  setConcurso(): void {
    this.concursoBody = {
      nome: this.concursoForm.get('nome').value,
      descricao: this.concursoForm.get('descricao').value,
      premio: this.concursoForm.get('premio').value,
      n_vencedor: this.concursoForm.get('n_vencedor').value,
      data_inicio: this.concursoForm.get('data_inicio').value,
      data_fim: this.concursoForm.get('data_fim').value,
      foto: this.fotoFile
    };
  }

  async upload() {
    if (this.files && this.files.size > 0) {
      await this.uploadFileService.upload('/concurso/images', this.files).toPromise();
    }
  }

  async update() {
    if (this.concursoForm.valid) {
      this.setConcurso();
      const concurso = await this.concursoService.update('/concurso/update/' + this.concursoId, this.concursoBody).toPromise();
      if (concurso.code == 200) {
        await this.upload();
        this.toastr.success(concurso.message, 'Sucesso!');
        this.goBack();
      }
    } else {
      this.toastr.error('Formulário inválido', 'Erro!');
    }
  }

  formatDate(date) {
    let dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return year + '-' + this.pad(month) + '-' + this.pad(day);
  }

  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  goBack() {
    this.location.back();
  }

}