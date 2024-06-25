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
import { AddEntiresModalComponent } from '../add-entires-modal/add-entires-modal.component';

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.css']
})
export class ConcursoComponent implements OnInit,AfterViewInit {

  participanteLista: [];
  isloading: boolean = false;
  participanteCarregar
  concursoId;
  usuarioActual;
  idClienteLogado;
  carteira: any;
  participanteSelecionado;
  concursoObject:{};
  addEntriesModalOpen = false;
  addEntriesData:{};
  contestEntries:any;
  formData: any;
  receivedEntires: any[] = []; // Declare the variable here

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
    private addEntiresService:AddEntiresService,

  ) { }

  
  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
      this.getConcursoById(this.concursoId);
      this.getContestEntries();
    });
   
    this.carteira = this.carteiraService.getCarteiraData();
    this.usuarioActual = this.auth.pegarUsuario
    this.participantePaginacao(1);

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
      this.concursoObject=concurso.dados[0];

    }
  }

  setParticipante(participante) {
      console.log("fffffffffffffffffffff",participante);
    this.participanteSelecionado = participante;
  }

  getImageUrl(filename: string) {
    return this.uploadService.getImageUrl('/download/images/', filename);
  }

  goBack() {
    this.location.back();
  }


  openAddEntriesModal(getConcursoObject: any) {
    console.log("..............................", getConcursoObject);
    this.addEntriesData = getConcursoObject;
    console.log("addEntriesData:", this.addEntriesData);
  }

  // receiveDataFromModal(data: any) {
  //   console.log('Received data from modal:', data);
  //   this.receivedEntires.push(data); // Now you can use it
  //   console.log("push data",this.receivedEntires)
   
  // }

  closeAddEntriesModal() {
    this.addEntriesModalOpen = false;
  }



  async getContestEntries() {
    try {
      const response = await this.addEntiresService.getAllEntires().toPromise();
      if(response.code == 200){
        this.contestEntries = response.dados;
        console.log(this.contestEntries);

    }
      
    } catch (error) {
      console.error(error);
    }
  }



}
