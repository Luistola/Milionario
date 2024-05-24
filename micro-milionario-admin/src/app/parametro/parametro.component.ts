import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FiltroClass } from '../service/geral/filtro-service';
import { MessageService } from '../service/message/message.service';
import { ParametroService } from '../service/parametro/parametro.service';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  parametroLista: [];
  isloading: boolean= false;
  parametroCarregar
  procurarItem:string
  parametroBody;
  parametroForm: FormGroup;
  parametro;
  parametroId;
  estado: boolean= true;

  constructor(
    public pagination: FiltroClass,
    private parametroService: ParametroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    toast: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.setParametroById(1);
    this.parametroPaginacao(this.pagination.pagination.page);
  }


  createForm(): void{
    this.parametroForm = this.formBuilder.group({
      nome: [''],
      valor: ['']
    });
  }

  setParametro(): void{
    this.parametroBody = {
      nome: this.parametroForm.get('nome').value,
      valor: this.parametroForm.get('valor').value
    };

    console.log(this.parametroBody);
  }

  async update(){
    this.setParametro();

    const parametro = await this.parametroService.update('/parametro/update/'+this.parametroId, this.parametroBody).toPromise();
    if(parametro.code == 200){
      this.toastr.success(parametro.message, 'Sucesso!');
      console.log(parametro.message);

      this.setParametroById(1);
      this.parametroPaginacao(this.pagination.pagination.page);
    }
   }

  async listarParametros(){
    this.isloading= true
     const listagemParametro= await this.parametroService.listarParametros(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemParametro.code == 200){
       this.isloading= false;
      this.parametroLista= listagemParametro.dados.data
      this.pagination.pagination.lastPage= listagemParametro.dados.lastPage;
      this.pagination.pagination.page= listagemParametro.dados.page;
      this.pagination.pagination.perPage= listagemParametro.dados.perPage;
      this.pagination.pagination.total = listagemParametro.dados.total;
      console.log(listagemParametro);
    }
  }

  parametroPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarParametros()
     }

   }

   preencherData(){
    this.parametroForm.get('nome').setValue(this.parametro.nome);
    this.parametroForm.get('valor').setValue(this.parametro.valor);
   }

   async setParametroById(data){
      const parametro = await this.parametroService.listarParametroById(data).toPromise();
      if(parametro.code == 200){
        this.parametro = parametro.dados;
        console.log(this.parametro);

        this.preencherData();
      }
   }

   async getParametroById(data){
     this.parametroId = data.id;
     this.estado = false;
    const parametro = await this.parametroService.listarParametroById(data.id).toPromise();
    if(parametro.code == 200){
      this.parametro = parametro.dados;
      console.log(this.parametro);

      this.preencherData();
    }
 }



}
