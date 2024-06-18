import { CarteiraService } from './../service/carteira/carteira.service';
import { Component, OnInit } from '@angular/core';
import { MovimentoService } from '../service/movimento/movimento.service';
import { AuthService } from '../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../service/message/message.service';
import { Carteira } from '../models/carteira/carteira.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  userId;
  carteiraBody;
  movimentoBody;
  carteira;
  pontos;
  carteiraSelecionada: Carteira;
  unitelMoney:number;

  constructor(
    private auth: AuthService,
    private carteiraService: CarteiraService,
    private movimentoService: MovimentoService,
    private toastr: ToastrService,
    toast: MessageService,
    private location: Location
  ) {
    this.userId = this.auth.pegarUsuario.id;
    this.carteira = this.carteiraService.getCarteiraData();
    this.pontos = this.carteira[0].pontos;
    this.unitelMoney = Number(this.pontos) * Number(250);
  }

  ngOnInit() {}

  async getPontos(userId){
    const carteira = await this.carteiraService.listarById(userId).toPromise();
    if(carteira.code == 200){
      this.carteira = carteira.dados[0];
      this.pontos = this.carteira.pontos;
      this.unitelMoney = Number(this.carteira.pontos) * Number(250);
    }
  }

  addInModelCarteira(){

    this.carteiraSelecionada = new Carteira(
      this.userId,
      Number(this.pontos) + Number(100)
    );

   }

  async saveCarregar(){
    this.carteiraBody = {
      user_id: this.userId,
      pontos: Number(this.pontos) + Number(100)
    }

    this.movimentoBody = {
      carteira_id: this.carteira[0].id,
      pontos: Number(this.pontos) + Number(100),
      valor_unitel_m: (Number(this.pontos) + Number(100)) * Number(250),
      tipo: 'CARREGAMENTO'
    }

    this.addInModelCarteira()

    const carteira = await this.carteiraService.update('/carteira/update/'+this.carteira[0].id, this.carteiraBody).toPromise();
    if(carteira.code == 200){
      console.log(carteira.message);
      await this.saveMovimento(this.movimentoBody);
      this.getPontos(this.userId)
      this.carteiraService.addItem(this.carteiraSelecionada);
      this.toastr.success(carteira.message, 'Sucesso!');
    }
   }

   async saveMovimento(dados){

    const movimento = await this.movimentoService.post('/movimento', dados).toPromise();
    if(movimento.code == 200){
      console.log(movimento.message);
    }
  }

  goBack(){
    this.location.back();
  }


  

}
