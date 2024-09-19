import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { VencedorService } from 'src/app/service/vencedor/vencedor.service';
import { VencedorClienteService } from 'src/app/service/vencedor-cliente/vencedor-cliente.service';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { ToastrService } from 'ngx-toastr';

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
  concursoSelecionado: string = 'Todos Concursos';
  isloading: boolean = false;
  tituloCliente: boolean = false;
  votacaoCarregar;
  selectedOption='';
  procurarItem: string;
  concurso = new Array<any>();
  latestArtistVencedorLista: any[] = [];
  latestClientVencedorLista: any[] = [];
  itemsToShow: number = 2;
  itemsToLoad: number = 2;
  


  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService,
    private concursoService: ConcursoService,
    private uploadService: UploadFileService,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
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
    if (this.concurso[0].id != undefined) {
      this.carregarListas(this.concurso[0]);
    }

   // this.votacaoPaginacaoPorParticipante(1);
   // this.votacaoPaginacaoPorCliente(1);

  }


  async carregarListas(concurso) {
    this.selectedOption = concurso.id;
    this.concursoSelecionado = concurso.nome;
    console.log(this.selectedOption);
    this.tituloCliente = true;
    await this.votacaoPaginacaoPorParticipante(1);
    await this.votacaoPaginacaoPorCliente(1);
  }

  async listarVencedorPorParticipante() {
    // console.log(this.selectedOption);
    this.isloading = true
    const listagemVencedor = await this.vencedorService.listarVencedoresArtistList(this.selectedOption, this.pagination.pagination, this.selectedOption).toPromise();
    if (listagemVencedor.code == 200) {
      this.isloading = false;
      this.vencedorParticipanteLista = listagemVencedor.dados.data
      this.pagination.pagination.lastPage = listagemVencedor.dados.lastPage;
      this.pagination.pagination.page = listagemVencedor.dados.page;
      this.pagination.pagination.perPage = listagemVencedor.dados.perPage;
      this.pagination.pagination.total = listagemVencedor.dados.total;
    }
  }

  votacaoPaginacaoPorParticipante(page: number): void {
    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.listarVencedorPorParticipante()
    }

  }

  async listarVencedorPorCliente() {
    // console.log(this.selectedOption);
    this.isloading = true
    const listagemVencedor = await this.vencedorClienteService.listarVencedorClientesWinner(this.selectedOption, this.pagination.pagination, this.selectedOption).toPromise();
    if (listagemVencedor.code == 200) {
      this.isloading = false;
      this.vencedorClienteLista = listagemVencedor.dados.data
      this.pagination.pagination.lastPage = listagemVencedor.dados.lastPage;
      this.pagination.pagination.page = listagemVencedor.dados.page;
      this.pagination.pagination.perPage = listagemVencedor.dados.perPage;
      this.pagination.pagination.total = listagemVencedor.dados.total;
    }
  }

  votacaoPaginacaoPorCliente(page: number): void {
    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.listarVencedorPorCliente()
    }

  }

  async listarConcursos() {
    try {
      this.isloading = true;
      const listagemConcurso = await this.concursoService.listarConcursoGenerateWinner().toPromise();
      if (listagemConcurso.code == 200) {
        this.isloading = false;
        this.concursoLista = listagemConcurso.dados;
      } else {
        console.error("Error listing concursos:", listagemConcurso);
      }
    } catch (error) {
      console.error("Error listing concursos:", error);
      this.isloading = false;
    }
  }

  goArtist(artista) {
    this.router.navigate(['/dashboard/artists/artist', artista.id]);
  }

  getImageUrl(filename: string) {
    return this.uploadService.getImageUrl('/download/images/', filename);
  }



  async latestWinnerArtist() {
    const latestArtistVencedor = await this.vencedorService.latestWinnerArtist().toPromise();
    if (latestArtistVencedor.code == 200) {
      this.latestArtistVencedorLista = latestArtistVencedor.dados;
    }

  }

  async latestWinnerClient() {
    const latestClientVencedor = await this.vencedorClienteService.latestWinnerClient().toPromise();
    if (latestClientVencedor.code == 200) {
      this.latestClientVencedorLista = latestClientVencedor.dados;
    }

  }



  async latestWinnerArtistRemove() {
    this.latestArtistVencedorLista = null;

  }

  async latestWinnerClientRemove() {
    this.latestClientVencedorLista = null;

  }



  loadMoreItems() {
    this.itemsToShow += this.itemsToLoad;
  }

  goBack() {
    this.location.back();
  }




  carregarListasWinner(data:any) {
    this.latestWinnerArtistRemove();
    this.latestWinnerClientRemove();
    this.votacaoPaginacaoPorParticipanteArtist(1);
    this.votacaoPaginacaoPorClienteWinner(1);
  }

  async listarVencedoresPorParticipante() {
    this.isloading = true
    const listagemVencedorParticipante = await this.vencedorService.listarVencedoresArtistList(this.selectedOption, this.pagination.pagination, this.selectedOption).toPromise();
    if (listagemVencedorParticipante.code == 200) {
      this.isloading = false;
      this.vencedorParticipanteLista = listagemVencedorParticipante.dados.data
      this.pagination.pagination.lastPage = listagemVencedorParticipante.dados.lastPage;
      this.pagination.pagination.page = listagemVencedorParticipante.dados.page;
      this.pagination.pagination.perPage = listagemVencedorParticipante.dados.perPage;
      this.pagination.pagination.total = listagemVencedorParticipante.dados.total;
      if (this.vencedorParticipanteLista.length == 0) {
        this.toastr.warning('vencedor não existe');

      }
    }
  }

  votacaoPaginacaoPorParticipanteArtist(page: number): void {
    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.listarVencedoresPorParticipante()
    }

  }

  async listarVencedorPorClienteWinner() {
    this.isloading = true
    const listagemVencedorCliente = await this.vencedorClienteService.listarVencedorClientesWinner(this.selectedOption, this.pagination.pagination, this.selectedOption).toPromise();
    if (listagemVencedorCliente.code == 200) {
      this.isloading = false;
      this.vencedorClienteLista = listagemVencedorCliente.dados.data
      this.pagination.pagination.lastPage = listagemVencedorCliente.dados.lastPage;
      this.pagination.pagination.page = listagemVencedorCliente.dados.page;
      this.pagination.pagination.perPage = listagemVencedorCliente.dados.perPage;
      this.pagination.pagination.total = listagemVencedorCliente.dados.total;
      if (this.vencedorClienteLista.length == 0) {
        this.toastr.warning('vencedor não existe');

      }
    }
  }

  votacaoPaginacaoPorClienteWinner(page: number): void {
    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.listarVencedorPorCliente()
    }

  }


 


}
