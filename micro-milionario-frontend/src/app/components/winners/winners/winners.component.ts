import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { VencedorService } from 'src/app/service/vencedor/vencedor.service';
import { VencedorClienteService } from 'src/app/service/vencedor-cliente/vencedor-cliente.service';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  vencedorParticipanteLista: [];
  vencedorClienteLista: [];
  concursoLista;
  concursoId;
  concursoSelecionado:string = 'Todos Concursos';
  isloading: boolean= false;
  tituloCliente: boolean= false;
  votacaoCarregar;
  selectedOption;
  procurarItem:string;
  concurso = new Array<any>();
  latestArtistVencedorLista;
  latestClientVencedorLista;
  itemsToShow: number = 6;
  itemsToLoad: number = 6;
  data;


  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService,
    private concursoService: ConcursoService,
    private uploadService: UploadFileService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap => {
    //   this.concursoId = paramMap.get('id');
    // });
    this.latestWinnerArtist();
    this.latestWinnerClient();
    this.listarConcursos();
    this.route.queryParams.subscribe(params => {
      this.concurso.push({
        id: params['concursoId'],
        nome: params['concurso_nome']
      });
      // this.concursoId = this.encryptionService.decryptData(encryptedParam);
    });
    if(this.concurso[0].id != undefined){
      this.carregarListas(this.concurso[0]);
    }

     this.votacaoPaginacaoPorParticipante(1);
     this.votacaoPaginacaoPorCliente(1);

  }
  

  async carregarListas(concurso){
    this.selectedOption = concurso.id;
    this.concursoSelecionado = concurso.nome;
    console.log(this.selectedOption);
    this.tituloCliente = true;
    await this.votacaoPaginacaoPorParticipante(1);
    await this.votacaoPaginacaoPorCliente(1);
  }

  async listarVencedorPorParticipante(){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVencedor= await this.vencedorService.listarVencedoresArtistList(this.selectedOption,this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVencedor.code == 200){
       this.isloading= false;
      this.vencedorParticipanteLista= listagemVencedor.dados.data
      this.pagination.pagination.lastPage= listagemVencedor.dados.lastPage;
      this.pagination.pagination.page= listagemVencedor.dados.page;
      this.pagination.pagination.perPage= listagemVencedor.dados.perPage;
      this.pagination.pagination.total = listagemVencedor.dados.total;
      console.log("pppppppppppppppppppppppp",this.vencedorParticipanteLista);
    }
  }

   votacaoPaginacaoPorParticipante(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarVencedorPorParticipante()
     }

   }

   async listarVencedorPorCliente(){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVencedor= await this.vencedorClienteService.listarVencedorClientesWinner(this.selectedOption,this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVencedor.code == 200){
       this.isloading= false;
      this.vencedorClienteLista= listagemVencedor.dados.data
      this.pagination.pagination.lastPage= listagemVencedor.dados.lastPage;
      this.pagination.pagination.page= listagemVencedor.dados.page;
      this.pagination.pagination.perPage= listagemVencedor.dados.perPage;
      this.pagination.pagination.total = listagemVencedor.dados.total;
      console.log("listarVencedorPorCliente",this.vencedorClienteLista);
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
    const ended=true;
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursoWinner(ended).toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados
      console.log("get lister.........................",listagemConcurso);
    }
  }

   goArtist(artista){
    this.router.navigate(['/dashboard/artists/artist', artista.id]);
   }

   getImageUrl(filename: string){
    return this.uploadService.getImageUrl('/download/images/',filename);
  }



  async latestWinnerArtist(){
    const latestArtistVencedor= await this.vencedorService.latestWinnerArtist().toPromise();
     if(latestArtistVencedor.code == 200){
      this.latestArtistVencedorLista= latestArtistVencedor.dados;
      console.log("latestWinnerArtist",this.latestArtistVencedorLista);
    }

  }

 async latestWinnerClient(){
    const latestClientVencedor= await this.vencedorClienteService.latestWinnerClient().toPromise();
     if(latestClientVencedor.code == 200){
      this.latestClientVencedorLista= latestClientVencedor.dados;
      console.log("latestWinnerClient",this.latestClientVencedorLista);
    }
    
  }

   goBack(){
    this.location.back();
  }

}
