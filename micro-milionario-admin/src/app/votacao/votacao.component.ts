import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltroClass } from '../service/geral/filtro-service';
import { VotacaoService } from '../service/votacao/votacao.service';
import { ConcursoService } from '../service/concurso/concurso.service';
import { ParametroService } from '../service/parametro/parametro.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {

  votacaoParticipanteLista: [];
  votacaoClienteLista: [];
  concursoLista;
  isloading: boolean= false;
  votacaoCarregar
  concursoId;
  usuarioActual;
  userLogado
  procurarItem:string
  vv;
  selectedOption;
  totalVotos
  valorPremio
  premiosParticipante = new Array<any>();
  premiosCliente = new Array<any>();
  numVencedores:number = 3;
  divisorPremio:number;
  valorVoto;

  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private votacaoService: VotacaoService,
    private concursoService: ConcursoService,
    private parametroService: ParametroService,
  ) { }

  ngOnInit() {
    this.listarParametros();
    this.listarConcursos();
  }

  carregarListas(){
    this.premiosParticipante = new Array<any>();
    this.premiosCliente = new Array<any>();
    // console.log(this.selectedOption);
    this.votacaoPaginacaoPorParticipante(1);
    this.votacaoPaginacaoPorCliente(1);
  }

  async listarVotacaoPorParticipante(){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVotacao= await this.votacaoService.listarByConcurso(this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVotacao.code == 200){
       this.isloading= false;
      this.votacaoParticipanteLista= listagemVotacao.dados.data
      this.pagination.pagination.lastPage= listagemVotacao.dados.lastPage;
      this.pagination.pagination.page= listagemVotacao.dados.page;
      this.pagination.pagination.perPage= listagemVotacao.dados.perPage;
      this.pagination.pagination.total = listagemVotacao.dados.total;
      console.log(this.votacaoParticipanteLista);

      for (const [i, v] of this.votacaoParticipanteLista.entries()) {
        await this.calcularPremioPorParticipante(v, i+1);
      }
    }

  }

   votacaoPaginacaoPorParticipante(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarVotacaoPorParticipante()
     }

   }

   async listarVotacaoPorCliente(){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVotacao= await this.votacaoService.listarByCliente(this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVotacao.code == 200){
       this.isloading= false;
      this.votacaoClienteLista= listagemVotacao.dados.data
      this.pagination.pagination.lastPage= listagemVotacao.dados.lastPage;
      this.pagination.pagination.page= listagemVotacao.dados.page;
      this.pagination.pagination.perPage= listagemVotacao.dados.perPage;
      this.pagination.pagination.total = listagemVotacao.dados.total;
      console.log(listagemVotacao);

      for (const [i, v] of this.votacaoClienteLista.entries()) {
        await this.calcularPremioPorCliente(v, i+1);
      }
    }
  }

   votacaoPaginacaoPorCliente(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarVotacaoPorCliente()
     }

   }

   async listarConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursoAberta().toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados
      console.log(listagemConcurso);
    }
  }

   async calcularPremioPorParticipante(concurso, posicao){
     console.log('ConcursoID: ' +concurso.votacao_concurso_id);

    await this.getTotalVotosByConcurso(concurso.votacao_concurso_id);
    let totalUM = Number(this.totalVotos * this.valorVoto.valor);
    let premioConcurso = Number(totalUM*50/100);
    const divisor:number = 2;

    console.log('TOTAL: ' +totalUM+ ' PREMIO: '+premioConcurso);
    console.log('CONCURSO: ' +concurso.votacao_concurso_id+ ' POSICAO: '+posicao);

    if(posicao <= concurso.concurso_n_vencedor){
      this.divisorPremio = Number(divisor*posicao);
      this.valorPremio = Number(premioConcurso/this.divisorPremio);
    }

    this.premiosParticipante.push({
      concurso_nome: concurso.concurso_nome,
      artist_nome: concurso.artist_nome,
      cliente_nome:concurso.cliente_nome,
      votos: concurso.votos,
      premio: this.valorPremio
    });

    console.log(this.premiosParticipante);
   }

   async calcularPremioPorCliente(concurso, posicao){
    console.log('ConcursoID: ' +concurso.votacao_concurso_id);

   await this.getTotalVotosByConcurso(concurso.votacao_concurso_id);
   let totalUM = Number(this.totalVotos * this.valorVoto.valor);
   let premioConcurso = Number(totalUM*50/100);
   const divisor:number = 2;

   console.log('TOTAL: ' +totalUM+ ' PREMIO: '+premioConcurso);
   console.log('CONCURSO: ' +concurso.votacao_concurso_id+ ' POSICAO: '+posicao);

   if(posicao <= concurso.concurso_n_vencedor){
    this.divisorPremio = Number(divisor*posicao);
    this.valorPremio = Number(premioConcurso/this.divisorPremio);
  }

   this.premiosCliente.push({
     concurso_nome: concurso.concurso_nome,
     artist_nome: concurso.artist_nome,
     cliente_nome:concurso.cliente_nome,
     votos: concurso.votos,
     premio: this.valorPremio
   });

   console.log(this.premiosCliente);
  }

   async getTotalVotosByConcurso(data){
    const totalVotos = await this.votacaoService.listarTotalVotosByConcurso(data).toPromise();
    if(totalVotos.code == 200){
      this.totalVotos = totalVotos.dados[0].votos;
      console.log(this.totalVotos);
    }
   }

   async listarParametros(){
    this.isloading= true
    console.log('object');
     const listagemParametro= await this.parametroService.listarParametroById(1).toPromise();
     if(listagemParametro.code == 200){
       this.isloading= false;
      this.valorVoto = listagemParametro.dados
      console.log(listagemParametro.dados);
    }
  }

}
