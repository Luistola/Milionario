import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Input, ChangeDetectorRef, NgZone } from '@angular/core';
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
  fotoFile: File | null = null;
  imagesData: String;
  @ViewChild('inputFile', { static: false }) fileInputRef: ElementRef;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;
  @Input('videoSource') src: string;


  constructor(private pousarService: PousarService, private ngZone: NgZone, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private toastr: ToastrService,
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
    this.fotoFile = selectedFile;
    console.log("first,t", this.fotoFile);
  }

  async save() {
    const formData = new FormData();
    formData.append('title', this.pousarForm.get('title').value);
    formData.append('description', this.pousarForm.get('description').value);

    if (this.fotoFile) {
      formData.append('file', this.fotoFile, this.fotoFile.name);
    }

    try {
      const response = await this.pousarService.createPousar(formData).toPromise();
      if (response.code === 202) {
        const imageUrl = response.dados.file; // assuming the response contains the image URL
        this.pousarData.file = imageUrl; // update the pousarData with the new image URL
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
      this.ngZone.run(() => {
        // Update the thumbnail URL
        this.thumbnail = url;

        // Ensure the video element exists and update it
        if (this.videoElement && this.videoElement.nativeElement) {
          this.videoElement.nativeElement.load();
          this.videoElement.nativeElement.play();
        }

        // Trigger change detection
        this.cdr.detectChanges();

        // Log the thumbnail URL for debugging
        console.log('>>>>>======>>', this.thumbnail);
      });
      return url;
    } catch (error) {
      console.error('An error occurred while getting the image URL', error);
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