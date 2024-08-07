import { CarteiraService } from './../service/carteira/carteira.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovimentoService } from '../service/movimento/movimento.service';
import { AuthService } from '../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../service/message/message.service';
import { Carteira } from '../models/carteira/carteira.model';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TopHeaderService } from '../service/top-header/top-header.service';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  userId;
  carteiraForm: FormGroup;
  carteiraBody;
  movimentoBody;
  carteira;
  pontos;
  carteiraSelecionada: Carteira;
  unitelMoney: number;
  fetchpoints: any = {};

  constructor(
    private auth: AuthService,
    private carteiraService: CarteiraService,
    private movimentoService: MovimentoService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private location: Location,
    private formBuilder: FormBuilder,
    private topHeaderService: TopHeaderService
  ) {

    this.carteira = this.carteiraService.getCarteiraData();
    this.pontos = this.carteira[0].pontos;
   }


  ngOnInit(): void {
    this.userId = this.auth.pegarUsuario.id;
    this.getPointsValue(this.userId);
    this.carteiraForm = this.formBuilder.group({
      unitelMoney: ['', Validators.required],
      pontos: ['', Validators.required]
    });
  }



  

  async getPointsValue(dados){
    const points = await this.carteiraService.listarById(dados).toPromise();
    if(points.code == 200){
      this.fetchpoints = points.dados[0];
      this.carteiraForm.patchValue({
        unitelMoney: this.fetchpoints.valor_unitel_m,
        pontos: this.fetchpoints.pontos
      });
    }
  }

  

  async getPontos(userId){
    try {
      const response = await this.carteiraService.listarById(userId).toPromise();
      if (response.code === 200) {
        this.carteira = response.dados;
        this.pontos = this.carteira[0].pontos;
        this.unitelMoney = Number(this.carteira[0].pontos) * Number(250);
        this.carteiraForm.patchValue({
          unitelMoney: this.unitelMoney,
          pontos: this.pontos
        });
      } else {
        console.error('Error getting pontos:', response);
      }
    } catch (error) {
      console.error('Error getting pontos:', error);
    }
  }

  addInModelCarteira(){
    this.carteiraSelecionada = new Carteira(
      this.userId,
      this.pontos
    );
  }

  async saveCarregar(){
    if (this.carteiraForm.valid) {
      this.carteiraBody = {
        user_id: this.userId,
        pontos: Number(this.carteiraForm.get('pontos').value),
      }

      this.addInModelCarteira();
      const carteira = await this.carteiraService.update('/carteira/update/', this.carteiraBody).toPromise();
      if(carteira.code == 200){
        console.log("update.........",carteira.dados);
        this.topHeaderService.updatePoints(carteira.dados);
        this.getPointsValue(this.userId);
        this.toastr.success(carteira.message);
      }
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