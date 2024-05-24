import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';

@Component({
  selector: 'app-ver-foto',
  templateUrl: './ver-foto.component.html',
  styleUrls: ['./ver-foto.component.css']
})
export class VerFotoComponent implements OnInit {

  @Input() slide_foto;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit() {
  }

  getImageUrl(filename: string){
    return this.uploadFileService.getImageUrl('/download/images/',filename);
  }

}
