import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { VencedorClienteService } from 'src/app/service/vencedor-cliente/vencedor-cliente.service';
import { VencedorService } from 'src/app/service/vencedor/vencedor.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  swiper1;
  swiper2;
  swiper3;
  latestArtistVencedorLista;
  latestClientVencedorLista;

  constructor( private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService, private uploadService: UploadFileService, private router: Router,) { }

  ngAfterViewInit(): void {
    this.swiper1 = new Swiper(".ssSlider1", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
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
    });

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

  ngOnInit() {
    this.latestWinnerArtist();
    this.latestWinnerClient();
   
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
      console.log("latestWinnerArtist",this.latestArtistVencedorLista);
    }

  }

 async latestWinnerClient(){
    const latestClientVencedor= await this.vencedorClienteService.latestWinnerClient().toPromise();
     if(latestClientVencedor.code == 200){
      this.latestClientVencedorLista= latestClientVencedor.dados;
      console.log("latestWinnerClient",this.latestClientVencedorLista);
    }
    
  }

  goArtist(artista){
    this.router.navigate(['/dashboard/artists/artist', artista.id]);
   }
}