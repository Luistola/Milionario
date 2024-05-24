import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  post(url, body):Observable<GeralInterfaceListar>{
    console.log(this.apiURL)
   return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  listarByConcurso(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/votacao/listarByConcurso`,{pagination:pagination, dados:dados});
  }

  listarByCliente(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/votacao/listarByCliente`,{pagination:pagination, dados:dados});
  }

  listarTotalVotosByConcurso(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/votacao/listarTotalVotosByConcurso`,{dados:dados});
  }
}
