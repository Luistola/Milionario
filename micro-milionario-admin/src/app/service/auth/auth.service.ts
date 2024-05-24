import { Usuario } from './../../models/usuario';
import { GeralInterfaceListar } from './../geral/geral-interface-listar';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  LoginUser: EventEmitter<any> = new EventEmitter();
  private usuarioSubject: BehaviorSubject<Usuario>
  public usuario: Observable<Usuario>

  constructor(private http: HttpClient)
  {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario = this.usuarioSubject.asObservable();
  }

  public get pegarUsuario(): Usuario {
    return this.usuarioSubject.value;
  }

  login(usuario: Usuario) {

    return this.http.post<any>(`${this.apiURL}/authenticate`, usuario)
        .pipe(map(user => {
            localStorage.setItem('usuario', JSON.stringify(user));
            this.usuarioSubject.next(user);
            return user
        }));
  }

  getUser(){
    return this.http.get(`${this.apiURL}/getUser`);
  }

  logout() {
    return this.http.post<any>(`${this.apiURL}/logout`, {}).pipe(map(user_sessao => {
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
    }))
  }

  listar(pagination, dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/user/listar`,{pagination:pagination, dados:dados});
  }

  post(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  listarRoles():Observable<GeralInterfaceListar>{
    return this.http.get<GeralInterfaceListar>(`${this.apiURL}/role`);
  }

  update(url, body):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, body);
  }

  delete(url):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}${url}`, '');
  }

  /* post(url, body):Observable<GeralInterfaceListar>{
    console.log(environment.app_url)
   return this.http.post<GeralInterfaceListar>(`${environment.app_url}${url}`, body)
} */
}
