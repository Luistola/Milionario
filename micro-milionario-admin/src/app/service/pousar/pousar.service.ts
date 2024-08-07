import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GeralInterfaceListar, GeralInterfacePousar } from '../geral/geral-interface-listar';



@Injectable({
  providedIn: 'root'
})
export class PousarService {


  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }


  createPousar(formData: FormData): Observable<GeralInterfacePousar> {
    return this.http.post<GeralInterfacePousar>(`${this.apiURL}/landingPage/add`, formData);
  }


  getPousarByRead(): Observable<GeralInterfaceListar> {
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/landingPage/read`);
  }



  // getPousarByView(image: string): Observable<Blob> {
  //   return this.http.get(`${this.apiURL}/download/images/${image}`, { responseType: 'blob' });
  // }



  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiURL}/download/images/${filename}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }


  getImageUrl(url: string, filename: string) {
    return `${this.apiURL}${url}${filename}`;
  }



  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

}
