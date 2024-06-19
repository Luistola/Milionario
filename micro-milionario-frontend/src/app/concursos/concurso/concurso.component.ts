import { ParticipanteService } from './../../service/participante/participante.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { CarteiraService } from 'src/app/service/carteira/carteira.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { EncryptionService } from 'src/app/service/encryption/encryption.service';
import { Location } from '@angular/common';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.css']
})
export class ConcursoComponent implements OnInit {

  participanteLista: [];
  isloading: boolean = false;
  participanteCarregar
  concursoId;
  usuarioActual;
  idClienteLogado;
  carteira: any;
  participanteSelecionado;
  concursoObject:{};

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
    private concursoService: ConcursoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
      this.getConcursoById(this.concursoId);
    });

    // this.route.queryParams.subscribe(params => {
    //   const encryptedParam = params['id'];
    //   this.concursoId = this.encryptionService.decryptData(encryptedParam);
    // });
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
      console.log("............................ggggggggggggggggggggggggggg",this.concursoObject);

    }
  }

  setParticipante(participante) {
    //  console.log(participante);
    this.participanteSelecionado = participante;
  }

  getImageUrl(filename: string) {
    return this.uploadService.getImageUrl('/download/images/', filename);
  }

  goBack() {
    this.location.back();
  }

}
