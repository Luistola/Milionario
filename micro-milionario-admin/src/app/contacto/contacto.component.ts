import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from '../service/contacto/contacto.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contactoLista: [];
  isloading: boolean= false;
  contactoCarregar
  procurarItem:string

  constructor(
    public pagination: FiltroClass,
    private contactoService: ContactoService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contactoPaginacao(1);
  }

  async listarContacto(){
    this.isloading= true
     const listagemContacto = await this.contactoService.listarContactos(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemContacto.code == 200){
       this.isloading= false;
      this.contactoLista= listagemContacto.dados.data
      this.pagination.pagination.lastPage= listagemContacto.dados.lastPage;
      this.pagination.pagination.page= listagemContacto.dados.page;
      this.pagination.pagination.perPage= listagemContacto.dados.perPage;
      this.pagination.pagination.total = listagemContacto.dados.total;
      console.log(listagemContacto);
    }
  }

  contactoPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarContacto()
     }

   }

  async apagar(id){

    const contacto = await this.contactoService.delete('/contacto/delete/'+id).toPromise();
    if(contacto.code == 200){
      console.log(contacto.message);
      this.toastr.success(contacto.message, 'Sucesso!');
    }
   }

}
