import { ParticipanteService } from './../../service/participante/participante.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { CarteiraService } from 'src/app/service/carteira/carteira.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { EncryptionService } from 'src/app/service/encryption/encryption.service';
import { Location } from '@angular/common';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { AddEntiresService } from 'src/app/service/add-entires/add-entires.service';
import { data } from 'src/app/service/geral/geral-interface-listar';

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.css']
})
export class ConcursoComponent implements OnInit, AfterViewInit {

  participanteLista: [];
  isloading: boolean = false;
  participanteCarregar
  concursoId;
  usuarioActual;
  idClienteLogado;
  carteira: any;
  participanteSelecionado;
  ContestEntrySelecionado;
  concursoObject: data;
  addEntriesModalOpen = false;
  addEntriesData: {};
  contestEntriesLista: any;
  filteredContestEntries: any;
  formData: any;
  receivedEntires: any[] = []; // Declare the variable here
  responseVote:any;

  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private participanteService: ParticipanteService,
    private auth: AuthService,
    private clienteService: ClienteService,
    private uploadService: UploadFileService,
    private carteiraService: CarteiraService,
    private encryptionService: EncryptionService,
    private location: Location,
    private concursoService: ConcursoService,
    private addEntiresService: AddEntiresService,

  ) { }


  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
      this.getConcursoById(this.concursoId);

    });

    this.carteira = this.carteiraService.getCarteiraData();
    this.usuarioActual = this.auth.pegarUsuario
    console.log("oooyyyyyyyyyyyyyyyyyyyyyyyyyyy",this.usuarioActual);
    this.participantePaginacao(1);
    this.getContestAgainEntry();
    this.updateVoteData();

     

  }

    updateVoteData(){
      this.carteiraService.votesChanged.subscribe((response: any) => {
        // Handle the response from the first API
        console.log("vote update",response);
        // Call the second API
        this.getContestAgainEntry();
        
      });
    }



  async listarParticipante() {
    this.isloading = true
    const listagemParticipante = await this.participanteService.listarByConcurso(this.pagination.pagination, this.concursoId).toPromise();
    if (listagemParticipante.code == 200) {
      this.isloading = false;
      this.participanteLista = listagemParticipante.dados.data
      this.pagination.pagination.lastPage = listagemParticipante.dados.lastPage;
      this.pagination.pagination.page = listagemParticipante.dados.page;
      this.pagination.pagination.perPage = listagemParticipante.dados.perPage;
      this.pagination.pagination.total = listagemParticipante.dados.total;
      // console.log(listagemParticipante);
    }
  }

  participantePaginacao(page: number): void {
    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.listarParticipante()
    }

  }

  async getCliente(userLogado) {
    this.idClienteLogado = await this.clienteService.listarByUser(userLogado.id).toPromise();
    // if(this.idClienteLogado.code == 200){
    //   console.log(this.idClienteLogado.dados[0].id);
    // }
  }


  async getConcursoById(data) {
    const concurso = await this.concursoService.listarById(data).toPromise();
    if (concurso.code == 200) {
      this.concursoObject = concurso.dados[0];
      this.concursoObject.premio=this.concursoObject.premio*this.concursoObject.price_percent/100;
      console.log("contest award",(this.concursoObject.premio)*(this.concursoObject.price_percent)/100);

    }
  }

  setParticipante(participante) {
    this.participanteSelecionado = participante;
  }

  setContestEntry(entry){
    this.ContestEntrySelecionado=entry;

  }

  getImageUrl(filename: string) {
    return this.uploadService.getImageUrl('/download/images/', filename);
  }

  goBack() {
    this.location.back();
  }


  openAddEntriesModal(getConcursoObject: any) {
    this.addEntriesData = getConcursoObject;
    console.log("addEntriesData:", this.addEntriesData);
  }

  receiveDataFromModal(data: any) {
    console.log('Callback called from parent component!', data);
    this.getContestAgainEntry();
   
  }



  closeAddEntriesModal() {
    this.getContestAgainEntry();
    this.addEntriesModalOpen = false;
  }




  async getContestAgainEntry() {
    try {
      const response = await this.addEntiresService.getcontestAgainstEntires(this.concursoId).toPromise();
      if (response.code == 200) {
        console.log("ooooouuuuuuuuuuuuuuuuuuuuuu",response.dados);
        this.contestEntriesLista = response.dados

      }

    } catch (error) {
      console.error(error);
    }
  }


  openLink(link: string) {
    if (link) {
      console.log("pppppppppppppppppppppppppppppppppppppppppppppppp");;
      window.open(link, '_blank');
    }
  }



}
