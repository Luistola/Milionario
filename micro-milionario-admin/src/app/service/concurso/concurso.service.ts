import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar, Participante } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class ConcursoService {

  apiURL = environment.apiURL;
  private data: Participante;

  constructor(private http: HttpClient) { }

  post(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
   }

   listarConcursoById(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listarById`,{dados:dados});
  }
//old
  listarConcursos(pagination):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listar`,{pagination:pagination});
  }

//new
  adminlistarConcursos(pagination):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/admin/listar`,{pagination:pagination});
  }

  listarConcursoAberta():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/concurso_pure`);
  }

  listarConcursoFinalizado():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/concurso_active`);
  }

  listarQtdConcurso():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/concurso_qtd`);
  }

  listarByDataFim(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/listarByDataFim`,{dados:dados});
  }

  update(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  delete(url):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, '');
  }


  findContestWinner(contestId):Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/concurso/generateWinner/${contestId}`);
  }


  getEntryByContest(contestId):Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/contestEntry/admin/contest/${contestId}`);
  }

  getSreachByConsurso(pagination,concursoname):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/concurso/search`,{pagination:pagination,name:concursoname});
  }


  deleteContest(contestId):Observable<GeralInterfaceListar>{
    return this.http.delete<GeralInterfaceListar>(`${this.apiURL}/concurso/delete/${contestId}`);
  }

  listarConcursoWinner(ended):Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/concurso/?ended=${ended}`);
  }
 

  setData(data: Participante) {
    this.data = data;
  }

  getData(): Participante {
    return this.data;
  }
}
