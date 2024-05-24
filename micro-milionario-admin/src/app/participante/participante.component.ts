import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FiltroClass } from '../service/geral/filtro-service';
import { ParticipanteService } from '../service/participante/participante.service';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {

  participanteLista: [];
  isloading: boolean= false;
  participanteCarregar
  concursoId;
  usuarioActual;
  userLogado

  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private participanteService: ParticipanteService,
    private toastr: ToastrService,
    // private auth: AuthService,
    // private votacaoService: VotacaoService,
    // private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');
    });

    this.participantePaginacao(1);
    // this.getCliente();
  }

  async listarParticipante(){
    this.isloading= true
     const listagemParticipante= await this.participanteService.listarByConcurso(this.pagination.pagination, this.concursoId).toPromise();
     if(listagemParticipante.code == 200){
       this.isloading= false;
      this.participanteLista= listagemParticipante.dados.data
      this.pagination.pagination.lastPage= listagemParticipante.dados.lastPage;
      this.pagination.pagination.page= listagemParticipante.dados.page;
      this.pagination.pagination.perPage= listagemParticipante.dados.perPage;
      this.pagination.pagination.total = listagemParticipante.dados.total;
      console.log(listagemParticipante);
    }
  }

   participantePaginacao(page:number): void{
     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarParticipante()
     }

   }

   async apagarParticipante(participante){
    await this.apagar(participante.participante_id);
    this.participantePaginacao(this.pagination.pagination.page);
  }

  async apagar(id){

    const participante = await this.participanteService.delete('/participante/delete/'+id).toPromise();
    if(participante.code == 200){
      console.log(participante.message);
      this.toastr.success(participante.message, 'Sucesso!');
    }
   }

}
