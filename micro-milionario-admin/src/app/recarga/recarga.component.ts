import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroClass } from '../service/geral/filtro-service';
import { RecargaService } from '../service/recarga/recarga.service';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent implements OnInit {

  recargaLista: [];
  isloading: boolean= false;
  recargaCarregar
  procurarItem:string

  constructor(
    public pagination: FiltroClass,
    private recargaService: RecargaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.recargaPaginacao(this.pagination.pagination.page);
  }

  async listarRecargas(){
    this.isloading= true
     const listagemRecarga= await this.recargaService.listarRecargas(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemRecarga.code == 200){
       this.isloading= false;
      this.recargaLista= listagemRecarga.dados.data
      this.pagination.pagination.lastPage= listagemRecarga.dados.lastPage;
      this.pagination.pagination.page= listagemRecarga.dados.page;
      this.pagination.pagination.perPage= listagemRecarga.dados.perPage;
      this.pagination.pagination.total = listagemRecarga.dados.total;
      console.log(listagemRecarga);
    }
  }

   recargaPaginacao(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarRecargas()
     }

   }

}
