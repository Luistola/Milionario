import { Component, OnInit } from '@angular/core';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';
import { VencedorClienteService } from '../service/vencedor-cliente/vencedor-cliente.service';
import { VencedorService } from '../service/vencedor/vencedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vencedor-participante',
  templateUrl: './vencedor-participante.component.html',
  styleUrls: ['./vencedor-participante.component.css']
})
export class VencedorParticipanteComponent implements OnInit {

  vencedorParticipanteLista: [];
  vencedorClienteLista: [];
  concursoLista;
  isloading: boolean= false;
  vencedorCarregar
  concursoId;
  usuarioActual;
  userLogado
  procurarItem:string
  selectedOption:any;
  
  


  constructor(
    public pagination: FiltroClass,
    private concursoService: ConcursoService,
    private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.listarConcursos();
  }

  selectOption(nome) {
   this.selectedOption=nome;
    console.log(`Selected option: ${nome}`);
  }

  carregarListas(){
    this.votacaoPaginacaoPorParticipante(1);
    this.votacaoPaginacaoPorCliente(1);
  }

  async listarVencedoresPorParticipante(){
    this.isloading= true
     const listagemVencedorParticipante= await this.vencedorService.listarVencedoresArtistList(this.selectedOption,this.pagination.paginationWinner, this.selectedOption).toPromise();
     if(listagemVencedorParticipante.code == 200){
       this.isloading= false;
      this.vencedorParticipanteLista= listagemVencedorParticipante.dados.data
      this.pagination.paginationWinner.lastPage= listagemVencedorParticipante.dados.lastPage;
      this.pagination.paginationWinner.page= listagemVencedorParticipante.dados.page;
      this.pagination.paginationWinner.perPage= listagemVencedorParticipante.dados.perPage;
      this.pagination.paginationWinner.total = listagemVencedorParticipante.dados.total;
      console.log("artist data",listagemVencedorParticipante);
    }
  }

   votacaoPaginacaoPorParticipante(page:number): void{
     if(this.pagination.paginationWinner.page == null){
       this.pagination.paginationWinner.page=1;
     }else{
       this.pagination.paginationWinner.page= page
       this.listarVencedoresPorParticipante()
     }

   }

   async listarVencedorPorCliente(){
    // this.isloading= true
     const listagemVencedorCliente= await this.vencedorClienteService.listarVencedorClientesWinner(this.selectedOption,this.pagination.paginationWinner, this.selectedOption).toPromise();
     if(listagemVencedorCliente.code == 200){
       this.isloading= false;
      this.vencedorClienteLista= listagemVencedorCliente.dados.data
      this.pagination.paginationWinner.lastPage= listagemVencedorCliente.dados.lastPage;
      this.pagination.paginationWinner.page= listagemVencedorCliente.dados.page;
      this.pagination.paginationWinner.perPage= listagemVencedorCliente.dados.perPage;
      this.pagination.paginationWinner.total = listagemVencedorCliente.dados.total;
      if(this.vencedorClienteLista.length==0){
        this.toastr.warning('vencedor não existe');

      }
    }
  }

   votacaoPaginacaoPorCliente(page:number): void{
     if(this.pagination.paginationWinner.page == null){
       this.pagination.paginationWinner.page=1;
     }else{
       this.pagination.paginationWinner.page= page
       this.listarVencedorPorCliente()
     }

   }

  

async listarConcursos(){
  const ended=true;
  this.isloading= true
   const listagemConcurso= await this.concursoService.listarConcursoWinner(ended).toPromise();
   if(listagemConcurso.code == 200){
     this.isloading= false;
    this.concursoLista= listagemConcurso.dados
    console.log("get lister.........................",this.concursoLista);
  }
}

 

}
