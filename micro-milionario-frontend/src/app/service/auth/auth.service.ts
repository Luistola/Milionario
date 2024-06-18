import { CarteiraService } from 'src/app/service/carteira/carteira.service';
import { Usuario } from './../../models/user/usuario';
import { GeralInterfaceListar } from './../geral/geral-interface-listar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { token } from '../../models/user/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  private usuarioSubject: BehaviorSubject<Usuario>
  public usuario: Observable<Usuario>
  userLogado!: Usuario;
  carteira;
  carteiraLocal;

  constructor(private http: HttpClient, private carteiraService: CarteiraService)
  {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario = this.usuarioSubject.asObservable();

    // var token = JSON.parse(localStorage.getItem('usuario'));
    // if(token) this.userLogado = this.getUserByToken(token.token.token);
  }

  public get pegarUsuario(): Usuario {
    return this.usuarioSubject.value;
  }

  login(usuario: Usuario) {

    return this.http.post<any>(`${this.apiURL}/authenticate`, usuario)
        .pipe(map(user => {
          console.log("get users",user);
            localStorage.setItem('usuario', JSON.stringify(user));
            // this.userLogado = this.getUserByToken(user.token);
            // console.log();
            // this.userLogado = this.getUser().toPromise();
            this.getPontos(user)
            this.usuarioSubject.next(user);
            return user
        }));
  }

  register(usuario: Usuario) {
    return this.http.post<any>(`${this.apiURL}/register`, usuario);
  }

  getUserByToken(token: string): Usuario {
    return JSON.parse(atob(token.split('.')[1])) as Usuario;
  }

  getUser(){
    return this.http.get(`${this.apiURL}/getUser`);
  }

  async getPontos(userId){
    // this.username = userId.username;
    // console.log('USER: '+this.username);
    const carteira = await this.carteiraService.listarById(userId.id).toPromise();
    if(carteira.code == 200){
      this.carteira = carteira.dados[0];
      this.carteiraService.addItem(this.carteira);
      console.log(this.carteira);
    }
  }

  logout() {
    return this.http.post<any>(`${this.apiURL}/logout`, {}).pipe(map(user_sessao => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('carteira');
        this.usuarioSubject.next(null);
    }))
  }

  buscaUserByPhone(dados):Observable<GeralInterfaceListar>{
    return this.http.post<GeralInterfaceListar>(`${this.apiURL}/user/listar_user_by_phone`,{dados:dados});
  }

  /* post(url, body):Observable<GeralInterfaceListar>{
    console.log(environment.app_url)
   return this.http.post<GeralInterfaceListar>(`${environment.app_url}${url}`, body)
} */
}

