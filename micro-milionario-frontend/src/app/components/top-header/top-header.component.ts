import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CarteiraService } from 'src/app/service/carteira/carteira.service';
import { TopHeaderService } from 'src/app/service/top-header/top-header.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit{
  itensInCarrinho: number;
  carteira;
  carteiraLocal;
  User;
  fetchpoints;
  points;
  username
  userRole;
  profileToggle:string = '';
  toggleModal=false;
  imageUpdate
  activeLink = '';


  constructor(
    private auth: AuthService,
    private carteiraService: CarteiraService,
    private router: Router,
    private topHeaderService: TopHeaderService,
    private elementRef: ElementRef,
    private uploadService: UploadFileService,
  ) {
    console.log(this.auth.pegarUsuario);
    this.carteiraService.carteira.subscribe(d=> {
      this.carteiraLocal = d[0].pontos

    });
    this.carteira = this.carteiraService.getCarteiraData();
    this.username = this.auth.pegarUsuario;
    this.userRole=this.auth.pegarUsuario.role_id;
  }

  

  ngOnInit() {
    this.topHeaderService.pointsChanged.subscribe((points) => {
      this.points = points;
      this.User = this.auth.pegarUsuario;
      this.getPointsValue(this.User.id);
    });

    this.topHeaderService.imageChanged.subscribe((image)=>{
      this.User = this.auth.pegarUsuario;
      this.getImageUrl(image.foto);

    })
    this.User = this.auth.pegarUsuario;
    this.getPointsValue(this.User.id);
    this.getImageUrl(this.User.foto);

  }

  getImageUrl(filename: string){
    this.imageUpdate= this.uploadService.getImageUrl('/download/images/',filename);
  }



  async getPointsValue(dados) {
    try {
      const points = await this.carteiraService.listarById(dados).toPromise();
      if (points.code == 200) {
        this.fetchpoints = points.dados[0];
      }
    } catch (error) {
      console.error('Error fetching points:', error);
      
    }
  }

  toggleProfile() {
    if (this.profileToggle == ''){
      this.profileToggle = 'userDDOpen';
    } else {
      this.profileToggle = ''; 
    }
  }

  logout() {
    this.auth.logout().pipe(first()).subscribe(data => {
      this.router.navigate(['/']);
    })
  }

  goEditarPerfil(User) {
    this.router.navigate(['/dashboard/perfil-cliente', +User.id]);
  }


  @HostListener('document:click', ['$event'])
  clickOutsideVoteModal(event: MouseEvent) {
    if (this.profileToggle && !this.elementRef.nativeElement.contains(event.target)) {
      this.profileToggle = '';
    }
  }


  toggleBodyClass() {
    const body = document.querySelector('body');
    if (body) {
      if (body.classList.contains('menuOpen')) {
        body.classList.remove('menuOpen');
      } else {
        body.classList.add('menuOpen');
      }
    }
  }
  
}
