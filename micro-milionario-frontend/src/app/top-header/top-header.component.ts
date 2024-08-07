import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth/auth.service';
import { CarrinhoService } from '../service/carrinho/carrinho.service';
import { CarteiraService } from '../service/carteira/carteira.service';
import { TopHeaderService } from '../service/top-header/top-header.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  itensInCarrinho: number;
  carteira;
  carteiraLocal;
  User;
  fetchpoints;
  points;

  constructor(
    private auth: AuthService,
    private carteiraService: CarteiraService,
    private router: Router,
    private topHeaderService: TopHeaderService
  ) {
    console.log(this.auth.pegarUsuario);
    // this.carteiraService.carteira.subscribe(d=> {
    //   console.log("mmmmmmmmmmmmmmmmmmmmm",d);
    //   this.carteiraLocal = d[0].pontos

    // });
    // this.carteira = this.carteiraService.getCarteiraData();
    // this.username = this.auth.pegarUsuario.username
    // console.log("first,.......",this.username);
  }

  ngOnInit() {
    this.topHeaderService.pointsChanged.subscribe((points) => {
      this.points = points;
      this.User = this.auth.pegarUsuario;
      this.getPointsValue(this.User.id);
    });
    this.User = this.auth.pegarUsuario;
    this.getPointsValue(this.User.id);

  }



  async getPointsValue(dados) {
    try {
      const points = await this.carteiraService.listarById(dados).toPromise();
      if (points.code == 200) {
        this.fetchpoints = points.dados[0];
        console.log("checking..................",this.fetchpoints);
      }
    } catch (error) {
      console.error('Error fetching points:', error);
      
    }
  }


  logout() {
    this.auth.logout().pipe(first()).subscribe(data => {
      this.router.navigate(['/']);
    })
  }

  goEditarPerfil(username) {
    this.router.navigate(['/dashboard/perfil-cliente', +username.id]);
  }




}
