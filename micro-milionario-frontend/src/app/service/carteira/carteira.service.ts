import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';
import { BehaviorSubject } from 'rxjs';
import { Carteira } from '../../models/carteira/carteira.model';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  apiURL = environment.apiURL;
  placeholder = [];
  carteira = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    const ls = this.getCarteiraData()
    console.log(ls);
    if(ls) this.carteira.next(ls);
  }

  removeItem(carteira: Carteira, qtdVotos:number){
    const ls = this.getCarteiraData()

    let exist: Carteira;

    if(ls){
      exist = ls.find((item) => {
        return item.user_id == carteira.user_id;
      });
    }

    if (exist) {
      exist.pontos= exist.pontos - qtdVotos;
      this.setCarteiraData(ls);
      this.carteira.next(this.getCarteiraData());
    }
  }

  addItem(carteira: Carteira){
    const ls = this.getCarteiraData()

    let exist: Carteira;

    if(ls){
      exist = ls.find((item) => {
        return item.user_id == carteira.user_id;
      });
    }

    if (exist) {
      exist.pontos = carteira.pontos;
      this.setCarteiraData(ls);
      this.carteira.next(this.getCarteiraData());
    } else {
      if (ls) {
        const newData = [...ls, carteira];
        this.setCarteiraData(newData);
        this.carteira.next(this.getCarteiraData());
      }else{
        this.placeholder.push(carteira);
        this.setCarteiraData(this.placeholder);
      }
    }
  }



  setCarteiraData(data:any){
    localStorage.setItem('carteira', JSON.stringify(data));

    this.getCarteiraData();
  }

  getCarteiraData(){
    return JSON.parse(localStorage.getItem('carteira'));
  }

  post(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  update(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  listarById(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/carteira/listarById`,{dados:dados});
  }
}
