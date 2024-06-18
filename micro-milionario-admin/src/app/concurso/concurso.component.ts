import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.css']
})
export class ConcursoComponent implements OnInit {

  concursoLista: [];
  isloading: boolean= false;
  concursoCarregar
  procurarItem:string
  concursoSelecionado: any;

  constructor(
    public pagination: FiltroClass,
    private concursoService: ConcursoService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.concursoPaginacao(this.pagination.pagination.page);
  }

  async listarConcursos(){
   
     const listagemConcurso= await this.concursoService.listarConcursos(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemConcurso.code == 200){
      this.concursoLista= listagemConcurso.dados.data
      console.log("firs.......................t",this.concursoLista)
      this.pagination.pagination.lastPage= listagemConcurso.dados.lastPage;
      this.pagination.pagination.page= listagemConcurso.dados.page;
      this.pagination.pagination.perPage= listagemConcurso.dados.perPage;
      this.pagination.pagination.total = listagemConcurso.dados.total;

      console.log("chhhhhhhhhhhhhhhhhhhhh",listagemConcurso);
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


   goParticipanteList(concurso){
    this.router.navigate(['/dashboard/concurso/participante', concurso.id]);
   }

   goVotacaoList(concurso){
    this.router.navigate(['/dashboard/concurso/votacao', concurso.id]);
   }

   goEditar(concurso){
    console.log("edit",concurso.id);
    this.router.navigate(['/dashboard/concurso/editar', concurso.id]);
  }

   async apagarConcurso(concurso){
    await this.apagar(concurso.id);
    this.concursoPaginacao(this.pagination.pagination.page);
  }

  async apagar(id){

    const concurso = await this.concursoService.delete('/concurso/delete/'+id).toPromise();
    if(concurso.code == 200){
      console.log(concurso.message);
      this.toastr.success(concurso.message, 'Sucesso!');
    }
   }
   


   



}
