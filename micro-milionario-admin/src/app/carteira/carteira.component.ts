import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarteiraService } from '../service/carteira/carteira.service';
import { ClienteService } from '../service/cliente/cliente.service';
import { FiltroClass } from '../service/geral/filtro-service';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  carteira;
  isloading: boolean= false;
  carteiraCarregar
  userId;
  unitelMoney
  cliente

  constructor(
    private route: ActivatedRoute,
    public pagination: FiltroClass,
    private carteiraService: CarteiraService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    });
    this.getCliente()
    this.listarCarteira()
  }

  async listarCarteira(){
    this.isloading= true
     const carteira= await this.carteiraService.listarById(this.userId).toPromise();
     if(carteira.code == 200){
      this.carteira = carteira.dados[0];
      this.unitelMoney = Number(this.carteira.pontos) * Number(250);
    }
  }

  async getCliente(){
    const cliente = await this.clienteService.listarByUser(this.userId).toPromise();
    if(cliente.code == 200){
      this.cliente = cliente.dados[0];
    }
   }


}
