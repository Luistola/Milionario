import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  upload(url: string, files: Set<File>){
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));
    return this.http.post(`${this.apiURL}${url}`, formData);
  }

  getImageUrl(url: string, filename: string) {
    return `${this.apiURL}${url}${filename}`;
  }
}
