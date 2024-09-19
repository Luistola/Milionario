import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ConcursoService } from 'src/app/service/concurso/concurso.service';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { VencedorClienteService } from 'src/app/service/vencedor-cliente/vencedor-cliente.service';
import { VencedorService } from 'src/app/service/vencedor/vencedor.service';
import Swiper from 'swiper';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  swiper1;
  swiper2;
  swiper3;
  latestArtistVencedorLista:any[]=[];
  latestClientVencedorLista:any[]=[];
  concursoLista: any[] = [];
  isloading: boolean= false;
  concursoCarregar
  procurarItem:string
  slideSelecionado: any;
  itemsToShow: number = 3;
  itemsToLoad: number = 3;
  User;
  

  constructor( private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService, private uploadService: UploadFileService, private router: Router, public pagination: FiltroClass,
    private concursoService: ConcursoService,  private auth: AuthService,  private location: Location
    ) { }


    ngOnInit() {
      this.User = this.auth.pegarUsuario;
      console.log("user profile",this.User);
      this.concursoPaginacao(1);
      this.latestWinnerArtist();
      this.latestWinnerClient();
     
    }

  ngAfterViewInit(): void {
    this.swiper1 = new Swiper(".ssSlider1", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      minSlides: 4, 
      mousewheel: false,
      freeMode: false,
      navigation: {
        nextEl: ".swiper-button-next1",
        prevEl: ".swiper-button-prev1",
      },
      pagination: {
        el: ".swiper-pagination1",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    }as any);

    this.swiper2 = new Swiper(".ssSlider2", {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      mousewheel: false,
      freeMode: false,
      pagination: {
        el: ".swiper-pagination2",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next2",
        prevEl: ".swiper-button-prev2",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  

  prevSlider(swiper) {
    swiper.slidePrev();
  }

  nextSlider(swiper) {
    swiper.slideNext();
  }

  getImageUrl(filename: string){
    return this.uploadService.getImageUrl('/download/images/',filename);
  }



  

  async latestWinnerArtist(){
    const latestArtistVencedor= await this.vencedorService.latestWinnerArtist().toPromise();
     if(latestArtistVencedor.code == 200){
      this.latestArtistVencedorLista= latestArtistVencedor.dados;
    }

  }

 async latestWinnerClient(){
    const latestClientVencedor= await this.vencedorClienteService.latestWinnerClient().toPromise();
     if(latestClientVencedor.code == 200){
      this.latestClientVencedorLista= latestClientVencedor.dados;
    }
    
  }

  goArtist(artista){
    this.router.navigate(['/dashboard/artists/artist', artista.id]);
   }


   async listarConcursos(){
    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursos1(this.procurarItem).toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados;
    }
  }

   concursoPaginacao(page:number): void{

     if(this.pagination.pagination.page == null){
       this.pagination.pagination.page=1;
     }else{
       this.pagination.pagination.page= page
       this.listarConcursos()
     }

   }

   goParticipanteList(concurso){
    this.router.navigate(['/dashboard/concursos/participantes', concurso.id]);
    
   }

   seeMoreWinner(){
      this.router.navigate(['/dashboard/winners']);
   }

   loadMoreItems() {
    if(this.itemsToShow += this.itemsToLoad){
      this.router.navigate(['/dashboard/concursos']);

    }

    

    
   
  }

  

}