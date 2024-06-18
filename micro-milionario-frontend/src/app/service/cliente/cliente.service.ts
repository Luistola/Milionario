import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';
import { GeralInterfaceUser } from '../geral/apiReposnse';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  post(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
   }

  listarByUser(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/cliente/listarByUser`,{dados:dados});
  }

  update(url, body):Observable<GeralInterfaceUser>{
    return this.http.post<GeralInterfaceUser>(`${this.apiURL}${url}`, body);
  }

  getClientUser(data:any):Observable<GeralInterfaceUser>{
    return this.http.get<GeralInterfaceUser>(`${this.apiURL}/${data}`);

  }


  getArtistUser(data:any):Observable<GeralInterfaceUser>{
    return this.http.get<GeralInterfaceUser>(`${this.apiURL}/${data}`);

  }

}
