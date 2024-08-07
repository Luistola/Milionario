import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { createEntiresInterface } from '../geral/geral-interface-listar';

@Injectable({
  providedIn: 'root'
})
export class ContestEntiresService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  updateEntiresStatus(entiresID:Number,entires:any):Observable<createEntiresInterface> {
    return this.http.post<createEntiresInterface>(`${this.apiURL}/contestEntry/update/${entiresID}`, entires);
  }

  getAllEntires(pagination):Observable<createEntiresInterface>{
    return this.http.post<createEntiresInterface>(`${this.apiURL}/contestEntry/read`,{pagination:pagination});
  }

  getEntiresById(contest_id:number):Observable<createEntiresInterface>{
    return this.http.get<createEntiresInterface>(`${this.apiURL}/contestEntry/${contest_id}`);
  }

}
