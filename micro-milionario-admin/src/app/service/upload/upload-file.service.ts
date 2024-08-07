import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ImageResponse } from '../geral/geral-interface-listar';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  // upload(url: string, files: Set<File>){
  //   const formData = new FormData();
  //   files.forEach(file => formData.append('file', file, file.name));
  //   return this.http.post(`${this.apiURL}${url}`, formData);
  // }

    upload(url: string, files: Set<File>): Observable<ImageResponse> {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file, file.name));
    return this.http.post<ImageResponse>(`${this.apiURL}${url}`, formData);
  }

  getImageUrl(url: string, filename: string) {
    return `${this.apiURL}${url}${filename}`;
  }
}
