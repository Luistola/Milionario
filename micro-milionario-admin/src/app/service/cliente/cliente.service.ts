import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  listarQtdClinte():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/cliente_qtd`);
  }

  listarCliente(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/cliente/listar`,{pagination:pagination, dados:dados});
  }

  listarByUser(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/cliente/listarByUser`,{dados:dados});
  }

  update(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  delete(url):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, '');
  }
}
