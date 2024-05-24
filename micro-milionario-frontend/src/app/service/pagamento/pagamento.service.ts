import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  post(url, body):Observable<GeralInterfaceListar>{
    console.log(this.apiURL)
   return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  getPagamentoLastId():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/pagamento/showLastId`);
  }

  postItens(url, body):Observable<GeralInterfaceListar>{
    console.log(this.apiURL)
   return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }
}
