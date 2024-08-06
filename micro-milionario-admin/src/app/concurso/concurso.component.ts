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
  searchconcursoList:[];
  searchTerm
  setBoeelean:boolean=false;

  constructor(
    public pagination: FiltroClass,
    private concursoService: ConcursoService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.concursoPaginacao(this.pagination.pagination.page);
    
  }




  clearSearch() {
    document.getElementById('serachPag').style.display='none';
    document.getElementById('concursoPage').style.display='block';
    this.searchTerm = '';
    this.concursoPaginacao(1);
    
  }


  search(){
    document.getElementById('concursoPage').style.display='none';
    document.getElementById('serachPag').style.display='block';
    this.searchPaginacao(1);
    
  }



  async listarConcursos(){
     const listagemConcurso= await this.concursoService.adminlistarConcursos(this.pagination.pagination).toPromise();
     if(listagemConcurso.code == 200){
      this.concursoLista= listagemConcurso.dados.data
      this.pagination.pagination.lastPage= listagemConcurso.dados.lastPage;
      this.pagination.pagination.page= listagemConcurso.dados.page;
      this.pagination.pagination.perPage= listagemConcurso.dados.perPage;
      this.pagination.pagination.total = listagemConcurso.dados.total;

    }
  }


   

   async sreachConcurso(){
    const listConcursoSerch= await this.concursoService.getSreachByConsurso(this.pagination.pagination,this.searchTerm).toPromise();
    if(listConcursoSerch.code == 200){
      this.concursoLista= listConcursoSerch.dados.data
      this.pagination.pagination.lastPage= listConcursoSerch.dados.lastPage;
      this.pagination.pagination.page= listConcursoSerch.dados.page;
      this.pagination.pagination.perPage= listConcursoSerch.dados.perPage;
      this.pagination.pagination.total = listConcursoSerch.dados.total;
      console.log("first",this.concursoLista);
      // if(this.concursoLista.length==0){
      //   this.concursoPaginacao(this.pagination.pagination.page);
      // }
    }
   }



   concursoPaginacao(page:number): void{

    if(this.pagination.pagination.page == null){
      this.pagination.pagination.page=1;
      this.listarConcursos();
    }else{
      this.pagination.pagination.page= page
      this.listarConcursos();
    }

  }

   searchPaginacao(page:number): void{
    
    if(this.pagination.pagination.page == null){
      this.pagination.pagination.page=1;
      this.sreachConcurso()
    }else{
      this.pagination.pagination.page= page
      this.sreachConcurso()
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


  async vencedorConcurso(concurso) {
    try {
      console.log("winner", concurso.id);
      const findWinner = await this.concursoService.findContestWinner(concurso.id).toPromise();
      if (findWinner.code == 200) {
        console.log(concurso.message);
        this.toastr.success(concurso.message, 'Sucesso!');
      } else if (findWinner.code == 400) {
        this.toastr.warning('Vencedor já existe para este concurso', 'Atenção!');
      }
    } catch (error) {
      console.error(error);
      // You can also display an error message to the user here
      this.toastr.error('Erro ao encontrar vencedor do concurso', 'Erro!');
    }
  }



  async apagar(id){
    const concurso = await this.concursoService.delete('/concurso/delete/'+id).toPromise();
    if(concurso.code == 200){
      console.log(concurso.message);
      this.toastr.success(concurso.message, 'Sucesso!');
    }
   }
   


   



}
