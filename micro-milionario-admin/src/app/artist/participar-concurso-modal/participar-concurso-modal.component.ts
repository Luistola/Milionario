import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { MessageService } from 'src/app/service/message/message.service';
import { ParticipanteService } from '../../service/participante/participante.service';
import { MusicaService } from '../../service/musica/musica.service';

@Component({
  selector: 'app-participar-concurso-modal',
  templateUrl: './participar-concurso-modal.component.html',
  styleUrls: ['./participar-concurso-modal.component.css']
})
export class ParticiparConcursoModalComponent implements OnInit {

  concursoLista: [];
  isloading: boolean= false;
  concursoCarregar
  procurarItem:string
  participanteBody;
  participanteForm: FormGroup;
  @Input() artista;
  musicas;
  @ViewChild('closebutton', {static: false}) closebutton;

  constructor(
    private formBuilder: FormBuilder,
    private participanteService: ParticipanteService,
    private concursoService: ConcursoService,
    private musicService: MusicaService,
    private toastr: ToastrService,
    toast: MessageService,
    public pagination: FiltroClass,

  ) { }

  ngOnInit() {
    // this.getMusicaByArtist(4);
    this.concursoPaginacao(1);
    this.createForm();
  }

  createForm(): void{
    this.participanteForm = this.formBuilder.group({
      concurso_id: ['']
      // musica_id: ['']
    });
  }

  setParticipante(): void{
    this.participanteBody = {
      concurso_id: this.participanteForm.get('concurso_id').value,
      artist_id: this.artista.id
    };

    console.log(this.participanteBody);
  }

  async save(){
    this.setParticipante();

    const participarConcurso = await this.participanteService.post('/participante', this.participanteBody).toPromise();
      if(participarConcurso.code == 200){
        console.log(participarConcurso.message);
        this.toastr.success(participarConcurso.message, 'Sucesso!');
        this.closebutton.nativeElement.click();
      }
   }

  //  async getMusicaByArtist(artistaId){
  //   console.log(artistaId);
  //   const musica = await this.musicService.listarByArtist(artistaId).toPromise();
  //   if(musica.code == 200){
  //     this.musicas = musica.dados;
  //     console.log(this.musicas);
  //   }
  //  }

   async listarConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursos(this.pagination.pagination).toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados.data
      this.pagination.pagination.lastPage= listagemConcurso.dados.lastPage;
      this.pagination.pagination.page= listagemConcurso.dados.page;
      this.pagination.pagination.perPage= listagemConcurso.dados.perPage;
      this.pagination.pagination.total = listagemConcurso.dados.total;
      console.log(listagemConcurso);
    }
  }

   concursoPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarConcursos()
     }

   }

}
