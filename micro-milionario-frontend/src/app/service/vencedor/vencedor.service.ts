import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class VencedorService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  // listarVencedores(pagination, dados):Observable<GeralInterfaceListar>{
  //   return this.http.post<GeralInterfaceListar>(`${this.apiURL}/music/listar`,{pagination:pagination, dados:dados});
  // }

  // listarByConcurso(dados):Observable<GeralInterfaceListar>{
  //   return this.http.post<GeralInterfaceListar>(`${this.apiURL}/music/listarByConcurso`,{dados:dados});
  // }

  post(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
   }

  listarVencedoresParticipantes(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/vencedor/listarByVencedor`,{pagination:pagination, dados:dados});
  }
}
