import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  listarByConcurso(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/participante/listarByConcurso`,{pagination:pagination, dados:dados});
  }

  post(url, body):Observable<GeralInterfaceListar>{
   return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }


}
