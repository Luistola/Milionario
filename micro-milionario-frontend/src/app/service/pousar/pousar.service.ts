import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfacePousar } from '../geral/apiReposnse';
import { GeralInterfaceListar } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class PousarService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

   
  getPousarByRead(): Observable<GeralInterfaceListar> {
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/landingPage/read`);
  }


  getImageUrl(url: string, filename: string) {
    return `${this.apiURL}${url}${filename}`;
  }





}
