import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GeralInterfacePousar } from '../geral/apiReposnse';

@Injectable({
  providedIn: 'root'
})
export class PousarService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

   
  getPousarByRead(): Observable<GeralInterfacePousar> {
    return this.http.get<GeralInterfacePousar>(`${this.apiURL}/landingPage/read`);
  }


  getImageUrl(url: string, filename: string) {
    return `${this.apiURL}${url}${filename}`;
  }





}
