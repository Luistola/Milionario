import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Carteira } from '../models/carteira/carteira.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CarteiraService } from 'src/app/service/carteira/carteira.service';
import { MovimentoService } from 'src/app/service/movimento/movimento.service';
import { TopHeaderService } from 'src/app/service/top-header/top-header.service';
import { MessageService } from 'src/app/service/message/message.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
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
    this.carteiraForm = new FormGroup({
      unitelMoney: new FormControl('', [Validators.required]),
      pontos: new FormControl('', [Validators.required])
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
    console.log(
      "llllllllllllllllllllllllllll"
    )
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
