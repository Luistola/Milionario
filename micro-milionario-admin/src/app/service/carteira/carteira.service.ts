import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  listarById(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/carteira/listarById`,{dados:dados});
  }
}
