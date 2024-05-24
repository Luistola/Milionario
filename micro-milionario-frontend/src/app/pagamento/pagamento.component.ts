import { PagamentoService } from './../service/pagamento/pagamento.service';
import { Recarga } from './../models/recarga/recarga.model';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../service/carrinho/carrinho.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  itens:Recarga[] = [];
  total:number;
  formaPagamento = new FormControl();
  valorEntregue = new FormControl();
  usuarioActual;

  constructor(
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private pagamentoService: PagamentoService
  ) { }

  ngOnInit() {
    this.carrinhoService.carrinhoItens.subscribe(data => {
      this.itens = data;

      if(this.itens) this.getTotal(this.itens);
    });
  }

  removeQtd(i){

  }
  addQtd(i){

  }
  onDelete(i:number){
    this.itens.splice(i, 1);
    this.carrinhoService.setRecargaData(this.itens);

    this.getTotal(this.itens);
  }

  validateInput(event:any, i:number){
    const qtd = +event.target.value;
    if(qtd < 1){
      event.target.value = this.itens[i].qtd;
      return;
    }

    this.QtdUpdated(qtd, i)
  }

  private QtdUpdated(qtd:number, i:number){
    this.itens[i].qtd = qtd;

    this.carrinhoService.setRecargaData(this.itens);

    this.getTotal(this.itens);
  }

  getTotal(data:any){
    let subs = 0;

    for(const item of data){
      subs += item.preco * item.qtd;
    }

    this.total= subs;
  }

  async getUser(){
    this.usuarioActual = await this.auth.getUser().toPromise();
   }

  async pagarRecarga(){
    await this.getUser();

    let body = {
      user_id: this.usuarioActual.id,
      valor_pagar: this.total,
      valor_entregue: this.valorEntregue.value,
      troco: 0.0,
    }

    const pagamento = await this.pagamentoService.post('/pagamento', body).toPromise();
    if(pagamento.code == 200){
      console.log(pagamento.message);
    }

    const pagamentoLastId = await this.pagamentoService.getPagamentoLastId().toPromise();
    if(pagamentoLastId.code == 200){
      console.log(pagamentoLastId.dados[0].lastId);
    }

    let subs = 0;

    for(const item of this.itens){
      subs += item.preco * item.qtd;
      let itensBody = {
        pagamento_id: pagamentoLastId.dados[0].lastId,
        recarga_id: item.id,
        preco_unitario: item.preco,
        qtd: item.qtd,
        total_recarga: subs,
      }

      const itensPagamento = await this.pagamentoService.postItens('/pagamento-recarga', itensBody).toPromise();
      if(itensPagamento.code == 200){
        console.log(itensPagamento.message);
      }
    }
  }

}
