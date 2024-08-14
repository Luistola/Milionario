import { Component, Input, OnInit } from '@angular/core';
import { Carteira } from '../../models/carteira/carteira.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { VotacaoService } from 'src/app/service/votacao/votacao.service';
import { CarteiraService } from 'src/app/service/carteira/carteira.service';
import { AddEntiresService } from 'src/app/service/add-entires/add-entires.service';
import { TopHeaderService } from 'src/app/service/top-header/top-header.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voto-modal',
  templateUrl: './voto-modal.component.html',
  styleUrls: ['./voto-modal.component.css']
})
export class VotoModalComponent implements OnInit {

  @Input() contestEntry;
  @Input() participante;
  @Input() carteira;
  @Input() idClienteLogado;
  contestEntryForm: FormGroup;

  // @Input() usuarioActual;
  votos = new FormControl();
  carteiraSelecionada: Carteira;
  carteiraBody;
  carteira1: any;
  username;

  constructor(
    private auth: AuthService,
    private votacaoService: VotacaoService,
    private carteiraService: CarteiraService,
    private toastr: ToastrService,
    private addEntiresService: AddEntiresService,
    private topHeaderService: TopHeaderService
  ) { }

  ngOnInit() {
    this.contestEntryForm = new FormGroup({
      vote: new FormControl('', [Validators.required, Validators.min(1)]),
      user_id: new FormControl(this.auth.pegarUsuario.id, Validators.required),
    });

  }

  async votarData() {
   if(this.contestEntryForm.valid){
    try {
      const response = await this.addEntiresService.updateVote(this.contestEntry.id, this.contestEntryForm.value).toPromise();
      if (response.code == 200) {
        this.carteiraService.updateVotes(response.dados);
        this.topHeaderService.updatePoints(response.dados);
        
        // update the original entires object in your component's state
      } else if (response.code == 404) {
        this.toastr.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }

   }else{

   }

  }





  async votar() {
    let body = {
      concurso_id: this.participante.participante_concurso_id,
      participante_id: this.participante.participante_id,
      cliente_id: this.idClienteLogado.dados[0].id,
      voto: this.votos.value
    }

    console.log(this.carteira);

    if (Number(this.votos.value) > Number(this.carteira[0].pontos)) {
      this.toastr.error('Pontos Insuficientes', 'Erro!');
    } else {
      const votacao = await this.votacaoService.post('/votacao', body).toPromise();
      if (votacao.code == 200) {
        await this.descontaPontos();
        this.toastr.success(votacao.message, 'Sucesso!');
      }
    }
  }





  async descontaPontos() {
    this.carteiraBody = {
      user_id: this.auth.pegarUsuario.id,
      pontos: Number(this.carteira[0].pontos) - Number(this.votos.value)
    }
    console.log(this.carteiraBody);
    this.addInModelCarteira();

    const carteira = await this.carteiraService.update('/carteira/update/' + this.carteira[0].id, this.carteiraBody).toPromise();
    if (carteira.code == 200) {
      console.log(carteira.message);
      this.toastr.success(carteira.message, 'Sucesso!');
     // this.carteiraService.removeItem(this.carteiraSelecionada, this.votos.value);
    }
  }

  addInModelCarteira() {

    this.carteiraSelecionada = new Carteira(
      this.auth.pegarUsuario.id,
      this.carteira[0].pontos
    );

    console.log(this.carteiraSelecionada);
  }





}
