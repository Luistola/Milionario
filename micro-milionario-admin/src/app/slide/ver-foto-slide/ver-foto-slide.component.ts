import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

@Component({
  selector: 'app-ver-foto-slide',
  templateUrl: './ver-foto-slide.component.html',
  styleUrls: ['./ver-foto-slide.component.css']
})
export class VerFotoSlideComponent implements OnInit {

  @Input() slide_foto;

  constructor(private uploadFileService: UploadFileService,) { }

  ngOnInit() {
  }

  getImageUrl(filename: string){
    return this.uploadFileService.getImageUrl('/download/images/',filename);
  }

}
