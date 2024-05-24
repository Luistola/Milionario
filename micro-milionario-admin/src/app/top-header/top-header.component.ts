import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  username

  constructor(private auth: AuthService, private router: Router) {
    this.username = this.auth.pegarUsuario.username
  }

  ngOnInit() {}

  logout() {
    this.auth.logout().pipe(first()).subscribe(data => {
      this.router.navigate(['/login']);
    })
  }

}
