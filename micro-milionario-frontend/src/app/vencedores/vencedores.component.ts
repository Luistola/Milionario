import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';
import { VencedorClienteService } from '../service/vencedor-cliente/vencedor-cliente.service';
import { VencedorService } from '../service/vencedor/vencedor.service';
import { Location } from '@angular/common';
import { UploadFileService } from '../service/upload/upload-file.service';

@Component({
  selector: 'app-vencedores',
  templateUrl: './vencedores.component.html',
  styleUrls: ['./vencedores.component.css']
})
export class VencedoresComponent implements OnInit {

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
     const listagemVencedor= await this.vencedorService.listarVencedoresParticipantes(this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVencedor.code == 200){
       this.isloading= false;
      this.vencedorParticipanteLista= listagemVencedor.dados.data
      this.pagination.pagination.lastPage= listagemVencedor.dados.lastPage;
      this.pagination.pagination.page= listagemVencedor.dados.page;
      this.pagination.pagination.perPage= listagemVencedor.dados.perPage;
      this.pagination.pagination.total = listagemVencedor.dados.total;
      console.log(listagemVencedor);
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
     const listagemVencedor= await this.vencedorClienteService.listarVencedorClientes(this.pagination.pagination, this.selectedOption).toPromise();
     if(listagemVencedor.code == 200){
       this.isloading= false;
      this.vencedorClienteLista= listagemVencedor.dados.data
      this.pagination.pagination.lastPage= listagemVencedor.dados.lastPage;
      this.pagination.pagination.page= listagemVencedor.dados.page;
      this.pagination.pagination.perPage= listagemVencedor.dados.perPage;
      this.pagination.pagination.total = listagemVencedor.dados.total;
      console.log(listagemVencedor);
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
     const listagemConcurso= await this.concursoService.listarConcurso().toPromise();
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

   goBack(){
    this.location.back();
  }

}
