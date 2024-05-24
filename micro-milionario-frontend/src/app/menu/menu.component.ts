import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { Usuario } from '../models/user/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Usuario;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {

  }

  ngOnInit() {
    this.user = this.auth.pegarUsuario;
  }

  goArtistPerfil(){
    this.router.navigate(['/dashboard/artists/perfil-artist', 1]);
   }

}
