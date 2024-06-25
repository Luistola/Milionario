import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { createEntiresInterface } from '../geral/apiReposnse';

@Injectable({
  providedIn: 'root'
})
export class AddEntiresService {

  apiURL = environment.apiURL;
  private formData: any;

  constructor(private http: HttpClient) { }

  addEntires(entires:any):Observable<createEntiresInterface> {
    return this.http.post<createEntiresInterface>(`${this.apiURL}/contestEntry/create`, entires);
  }

  updateEntires(entiresID:Number,entires:any):Observable<createEntiresInterface> {
    return this.http.post<createEntiresInterface>(`${this.apiURL}/contestEntry/update/${entiresID}`, entires);
  }

  getAllEntires():Observable<createEntiresInterface>{
    return this.http.get<createEntiresInterface>(`${this.apiURL}/contestEntry/read`);
  }

  getEntiresById(contest_id:number):Observable<createEntiresInterface>{
    return this.http.get<createEntiresInterface>(`${this.apiURL}/contestEntry/${contest_id}`);
  }

  
}