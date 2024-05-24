import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth/auth.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-utilizador',
  templateUrl: './utilizador.component.html',
  styleUrls: ['./utilizador.component.css']
})
export class UtilizadorComponent implements OnInit {

  utilizadorLista: [];
  isloading: boolean= false;
  utilizadorCarregar
  procurarItem:string

  constructor(
    public paginations: FiltroClass,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.utilizadorPaginacao(this.paginations.pagination.page);
  }

  async listarUtilizador(){
    this.isloading= true
     const listagemUtilizador = await this.authService.listar(this.paginations.pagination, this.procurarItem).toPromise();
     if(listagemUtilizador.code == 200){
       this.isloading= false;
      this.utilizadorLista= listagemUtilizador.dados.data
      this.paginations.pagination.lastPage= listagemUtilizador.dados.lastPage;
      this.paginations.pagination.page= listagemUtilizador.dados.page;
      this.paginations.pagination.perPage= listagemUtilizador.dados.perPage;
      this.paginations.pagination.total = listagemUtilizador.dados.total;
      console.log(listagemUtilizador);
    }
  }

  utilizadorPaginacao(page:number): void{
    console.log(page);
     if(this.paginations.pagination.page == null){
       this.paginations.pagination.page=1;
     }else{
       this.paginations.pagination.page= page
       this.listarUtilizador()
     }

   }

   async apagarUtilizador(utilizador){
    await this.apagar(utilizador.user_id);
    this.utilizadorPaginacao(this.paginations.pagination.page);
  }

  async apagar(id){

    const utilizador = await this.authService.delete('/user/delete/'+id).toPromise();
    if(utilizador.code == 200){
      console.log(utilizador.message);
      this.toastr.success(utilizador.message, 'Sucesso!');
    }
   }

}
