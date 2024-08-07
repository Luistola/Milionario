import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class VencedorClienteService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  post(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
   }
//old
  listarVencedorClientes(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/vencedor-cliente/listarByVencedorCliente`,{pagination:pagination, dados:dados});
  }
//new
  listarVencedorClientesWinner(contestId,pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/vencedor-cliente/${contestId}`,{pagination:pagination, dados:dados});
  }
}

