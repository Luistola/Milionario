import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class ConcursoService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  listarConcursos(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listar`,{pagination:pagination, dados:dados});
  }

  listarConcursos1(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listarAlt`,{dados:dados});
  }

  listarConcurso():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/concurso_active`);
  }

  listarById(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listarById`,{dados:dados});
  }

  listarByDataFim(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listarByDataFim`,{dados:dados});
  }

  update(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }
}
