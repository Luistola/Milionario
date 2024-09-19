import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/user/usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user: Usuario;
  activeLink = '';
  username
  userRole;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {

    this.username = this.auth.pegarUsuario;
    this.userRole=this.auth.pegarUsuario.role_id;

  }

  


  ngOnInit() {
    this.user = this.auth.pegarUsuario;
  }

  goArtistPerfil(){
    this.router.navigate(['/dashboard/artists/perfil-artist', 1]);
   }
}
