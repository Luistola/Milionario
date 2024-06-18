import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { PousarService } from '../service/pousar/pousar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pousar',
  templateUrl: './pousar.component.html',
  styleUrls: ['./pousar.component.css']
})
export class PousarComponent implements OnInit, AfterViewInit {

  errorMessage: string | null = null;
  thumbnail: any;
  imageToShow: any;
  isImageLoading: boolean;
  pousarForm: FormGroup;
  pousarData: any;
  url: string | ArrayBuffer = '';
  format: string;
  fotoFile: string;
  imagesData: String;
  files: Set<File> = new Set();
  @ViewChild('inputFile', { static: false }) fileInputRef: ElementRef;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;

  constructor(private pousarService: PousarService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
   this.pousarData = {};
   }

  ngOnInit() {
    this.createForm();
    this.getByPousarRead();
  }

  ngAfterViewInit() {
    this.initVideo();
  }

  createForm(): void {
    this.pousarForm = this.formBuilder.group({
      title: [''],
      description: [''],
      file: [''],
    });
  }



  onChangeFoto(event) {
    const selectedFile = event.target.files[0];
    this.fotoFile = selectedFile.name;
    console.log("first,t", this.fotoFile);
    if (this.files) {
      this.files.add(selectedFile);
    }
  }

  async save() {
    const formData = new FormData();
    formData.append('title', this.pousarForm.get('title').value);
    formData.append('description', this.pousarForm.get('description').value);

    if (this.files && this.files.size > 0) {
      this.files.forEach(file => {
        formData.append('file', file, file.name);
      });
    }

    try {
      const pousar = await this.pousarService.createPousar(formData).toPromise();
      if (pousar.code === 202) {
        this.getByPousarRead();
        this.getImageUrl(this.pousarData.file);
        this.toastr.success('Slide Salvo Com Sucesso!', 'Sucesso!');

      }
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  }

  async getByPousarRead() {
    try {
      const listagemSlide = await this.pousarService.getPousarByRead().toPromise();
      if (listagemSlide.code === 200) {
        this.pousarData = listagemSlide.dados;
        console.log("read api", this.pousarData);
        this.getImageUrl(this.pousarData.file);
      }
    } catch (error) {
      console.error("Error getting pousar read:", error);
    }
  }





  async getImageUrl(filename: string): Promise<string> {
    try {
      const url = await this.pousarService.getImageUrl('/download/images/', filename);
      this.thumbnail = url;
      return url;
    } catch (error) {
      console.error("An error occurred");
      throw error;
    }
  }


  initVideo() {
    if (this.videoElement) {
      document.addEventListener("DOMContentLoaded", () => {
        this.videoElement.nativeElement.play();
      });
    }
  }


}