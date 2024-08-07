import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EntiresInterface, GetEntriesInterface, createEntiresInterface } from '../geral/apiReposnse';

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

  updateVote(entiresID:Number,voteObj:any):Observable<createEntiresInterface> {
    return this.http.post<createEntiresInterface>(`${this.apiURL}/contestEntry/give-vote/${entiresID}`, voteObj);
  }

  updateEntires(entiresID:Number,entires:any):Observable<createEntiresInterface> {
    return this.http.post<createEntiresInterface>(`${this.apiURL}/contestEntry/update/${entiresID}`, entires);
  }

  
  getcontestAgainstEntires(contestId):Observable<GetEntriesInterface>{
    return this.http.get<GetEntriesInterface>(`${this.apiURL}/contestEntry/contest/${contestId}`);
  }

  getEntiresById(contest_id:number):Observable<createEntiresInterface>{
    return this.http.get<createEntiresInterface>(`${this.apiURL}/contestEntry/${contest_id}`);
  }

  
}