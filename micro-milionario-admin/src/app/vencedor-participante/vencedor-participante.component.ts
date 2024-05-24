import { Component, OnInit } from '@angular/core';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';
import { VencedorClienteService } from '../service/vencedor-cliente/vencedor-cliente.service';
import { VencedorService } from '../service/vencedor/vencedor.service';

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
  vv;
  selectedOption;


  constructor(
    public pagination: FiltroClass,
    private concursoService: ConcursoService,
    private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService,
  ) { }

  ngOnInit() {
    this.listarConcursos();
  }

  carregarListas(){
    console.log(this.selectedOption);
    this.votacaoPaginacaoPorParticipante(1);
    this.votacaoPaginacaoPorCliente(1);
  }

  async listarVencedoresPorParticipante(){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVencedorParticipante= await this.vencedorService.listarVencedoresParticipantes(this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVencedorParticipante.code == 200){
       this.isloading= false;
      this.vencedorParticipanteLista= listagemVencedorParticipante.dados.data
      this.pagination.pagination.lastPage= listagemVencedorParticipante.dados.lastPage;
      this.pagination.pagination.page= listagemVencedorParticipante.dados.page;
      this.pagination.pagination.perPage= listagemVencedorParticipante.dados.perPage;
      this.pagination.pagination.total = listagemVencedorParticipante.dados.total;
      console.log(listagemVencedorParticipante);
    }
  }

   votacaoPaginacaoPorParticipante(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarVencedoresPorParticipante()
     }

   }

   async listarVencedorPorCliente(){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVencedorCliente= await this.vencedorClienteService.listarVencedorClientes(this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVencedorCliente.code == 200){
       this.isloading= false;
      this.vencedorClienteLista= listagemVencedorCliente.dados.data
      this.pagination.pagination.lastPage= listagemVencedorCliente.dados.lastPage;
      this.pagination.pagination.page= listagemVencedorCliente.dados.page;
      this.pagination.pagination.perPage= listagemVencedorCliente.dados.perPage;
      this.pagination.pagination.total = listagemVencedorCliente.dados.total;
      console.log(listagemVencedorCliente);
    }
  }

   votacaoPaginacaoPorCliente(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarVencedorPorCliente()
     }

   }

   async listarConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursoFinalizado().toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados
      console.log(listagemConcurso);
    }
  }

  //  concursoPaginacao(page:number): void{

  //    if(this.pagination.pagination.page == null){
  //      this.pagination.pagination.page=1;
  //    }else{
  //      this.pagination.pagination.page= page
  //      this.listarConcursos()
  //    }

  //  }

}
