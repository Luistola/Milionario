import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth/auth.service';
import { CarrinhoService } from '../service/carrinho/carrinho.service';
import { CarteiraService } from '../service/carteira/carteira.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  itensInCarrinho: number;
  carteira;
  carteiraLocal;
  username;

  constructor(
    private auth: AuthService,
    private carteiraService: CarteiraService,
    private router: Router
  ) {
    console.log(this.auth.pegarUsuario);
    this.carteiraService.carteira.subscribe(d=> {
      console.log(d[0]);
      this.carteiraLocal = d[0].pontos

    });
    this.carteira = this.carteiraService.getCarteiraData();
    this.username = this.auth.pegarUsuario;
    console.log("first,.......",this.carteiraLocal)
  }

  ngOnInit() {

  }

  logout() {
    this.auth.logout().pipe(first()).subscribe(data => {
      this.router.navigate(['/login']);
    })
  }

  goEditarPerfil(username){
    this.router.navigate(['/dashboard/perfil-cliente',+username.id]);
  }

   


}
