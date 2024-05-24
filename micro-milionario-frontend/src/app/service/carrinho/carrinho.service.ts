import { Recarga } from './../../models/recarga/recarga.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Carteira } from 'src/app/models/carteira/carteira.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  placeholder = [];
  carrinhoItens = new BehaviorSubject([]);
  // carteira = new BehaviorSubject([]);

  constructor() {
    const ls = this.getRecargaData()
    console.log(ls);
    if(ls) this.carrinhoItens.next(ls);
   }

   removeItem(carteira: Carteira){
    const ls = this.getRecargaData()

    let exist: Carteira;

    if(ls){
      exist = ls.find((item) => {
        return item.user_id == carteira.user_id;
      });
    }

    if (exist) {
      console.log('Carteira'+ exist);
      exist.pontos--;
      this.setRecargaData(ls);
    }
  }

  addItem(recarga: Recarga){
    const ls = this.getRecargaData()

    let exist: Recarga;

    if(ls){
      exist = ls.find((item) => {
        return item.id == recarga.id;
      });
    }

    if (exist) {
      exist.qtd++;
      this.setRecargaData(ls);
    } else {
      if (ls) {
        const newData = [...ls, recarga];
        this.setRecargaData(newData);
        this.carrinhoItens.next(this.getRecargaData());
      }else{
        this.placeholder.push(recarga);
        this.setRecargaData(this.placeholder);
      }
    }
  }

  setRecargaData(data:any){
    localStorage.setItem('carrinho', JSON.stringify(data));

    this.getRecargaData();
  }

  getRecargaData(){
    return JSON.parse(localStorage.getItem('carrinho'));
  }

  // setCarteiraData(data:any){
  //   localStorage.setItem('carteira', JSON.stringify(data));

  //   this.getCarteiraData();
  // }

  // getCarteiraData(){
  //   return JSON.parse(localStorage.getItem('carteira'));
  // }
}
