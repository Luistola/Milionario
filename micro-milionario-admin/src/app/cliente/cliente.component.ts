import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../service/cliente/cliente.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clienteLista: [];
  isloading: boolean= false;
  clientCarregar
  procurarItem:string
  searchTerm;
  constructor(
    public pagination: FiltroClass,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.clientePaginacao(1);
  }


  clearSearch() {
    document.getElementById('serachPag').style.display='none';
    document.getElementById('clientList').style.display='block';
    console.log('clear artist function called');
    this.searchTerm = '';
    this.clientePaginacao(1);
  }


  search(){
    document.getElementById('clientList').style.display='none';
    document.getElementById('serachPag').style.display='block';
    console.log("serch artist function here");
    this.searchPaginacao(1);
    
  
  }

  async listarCliente(){
    this.isloading= true
     const listagemCliente = await this.clienteService.listarCliente(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemCliente.code == 200){
       this.isloading= false;
      this.clienteLista= listagemCliente.dados.data
      this.pagination.pagination.lastPage= listagemCliente.dados.lastPage;
      this.pagination.pagination.page= listagemCliente.dados.page;
      this.pagination.pagination.perPage= listagemCliente.dados.perPage;
      this.pagination.pagination.total = listagemCliente.dados.total;
      console.log(listagemCliente);
    }
  }

  async searchCliente(){
    this.isloading= true
     const listagemCliente = await this.clienteService.getSreachByClient(this.pagination.pagination, this.searchTerm).toPromise();
     if(listagemCliente.code == 200){
       this.isloading= false;
      this.clienteLista= listagemCliente.dados.data
      this.pagination.pagination.lastPage= listagemCliente.dados.lastPage;
      this.pagination.pagination.page= listagemCliente.dados.page;
      this.pagination.pagination.perPage= listagemCliente.dados.perPage;
      this.pagination.pagination.total = listagemCliente.dados.total;
      if(this.clienteLista.length==0){
        this.toastr.warning('cliente não encontrado');
      }
    }
  }

  clientePaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
       this.listarCliente()
     }else{
       this.pagination.pagination.page= page
       this.listarCliente()
     }

   }


   searchPaginacao(page:number): void{

    if(this.pagination.pagination.page == null){
      this.pagination.pagination.page=1;
      this.searchCliente()
    }else{
      this.pagination.pagination.page= page
      this.searchCliente()
    }

  }

   verCarteira(cliente){
    this.router.navigate(['/dashboard/cliente/carteira', cliente.user_id]);
   }

   async apagarCliente(cliente){
    await this.apagar(cliente.id);
    this.clientePaginacao(this.pagination.pagination.page);
  }

  async apagar(id){

    const cliente = await this.clienteService.delete('/cliente/delete/'+id).toPromise();
    if(cliente.code == 200){
      console.log(cliente.message);
      this.toastr.success(cliente.message, 'Sucesso!');
    }
   }

}
