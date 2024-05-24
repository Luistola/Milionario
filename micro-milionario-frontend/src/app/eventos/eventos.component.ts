import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  concursoLista: [];
  isloading: boolean= false;
  concursoCarregar
  concursoSelecionado;
  usuarioActual;
  procurarItem:string

  constructor(
    public pagination: FiltroClass,
    private auth: AuthService,
    private concursoService: ConcursoService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.concursoPaginacao(1);
  }

  async listarConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursos(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados.data
      this.pagination.pagination.lastPage= listagemConcurso.dados.lastPage;
      this.pagination.pagination.page= listagemConcurso.dados.page;
      this.pagination.pagination.perPage= listagemConcurso.dados.perPage;
      this.pagination.pagination.total = listagemConcurso.dados.total;
      console.log(listagemConcurso);
    }
  }

   concursoPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarConcursos()
     }

   }

   async getUser(){
    this.usuarioActual = await this.auth.getUser().toPromise();
   }

   goToParticipar(concurso){
    this.router.navigate(['/dashboard/eventos/participar', concurso.id]);
   }

   setConcurso(concurso){
     this.concursoSelecionado = concurso;
   }

}
