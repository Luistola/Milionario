import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PousarService } from 'src/app/service/pousar/pousar.service';


@Component({
  selector: 'app-pousar',
  templateUrl: './pousar.component.html',
  styleUrls: ['./pousar.component.css']
})
export class PousarComponent implements OnInit, AfterViewInit {
  pousarData: any;
  thumbnail: any;
  format;
  url;

  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;

  constructor(private pousarService: PousarService, private router: Router) { }

  ngOnInit() {
    this.getByPousarRead();
  }

  async getByPousarRead() {
    try {
      const listagemSlide = await this.pousarService.getPousarByRead().toPromise();
      if (listagemSlide.code === 200) {
        this.pousarData = listagemSlide.dados;
        this.getImageUrl(this.pousarData.file);
      } else {
        // Handle other status codes if needed
      }
    } catch (error) {
      // Handle errors
      console.error('An error occurred while fetching data:', error);
    }
  }

  ngAfterViewInit() {
    this.initVideo();
  }

  getImageUrl(filename: string) {
    try {
      this.thumbnail = this.pousarService.getImageUrl('/download/images/', filename);
      console.log("dddddddddddddd", this.thumbnail);
    } catch (error) {
      console.error("An error occurred while fetching the image URL:", error);
    }
  }

  initVideo() {
    console.log("I AM HERE===?", this.videoElement)
    if (this.videoElement) {
      console.log("HE:LL0000")
      this.videoElement.nativeElement.play();
    }
  }


}