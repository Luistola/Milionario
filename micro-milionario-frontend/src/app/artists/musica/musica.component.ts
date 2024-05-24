import { UploadFileService } from './../../service/upload/upload-file.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/service/artist/artist.service';
import { MusicService } from 'src/app/service/music/music.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  artistaId;
  artista;
  musicaBody;
  fotoFile;
  musicaFile;
  videoFile;
  musicForm: FormGroup;
  files: Set<File>;
  generoEscolhido = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private uploadFileService: UploadFileService,
    private musicService: MusicService,
    private toastr: ToastrService,
    toast: MessageService,
  ) { }

  dropdownList = [];
/*   dropdownSettings = {};
 */
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.artistaId = paramMap.get('id');

      this.dropdownList = [
        { item_id: 1, item_text: 'Mumbai' },
        { item_id: 2, item_text: 'Bangaluru' },
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' },
        { item_id: 5, item_text: 'New Delhi' }
      ];


    }
    );
    console.log(this.artistaId);
    this.getArtista(this.artistaId);
    this.createForm();

    this.files = new Set();
  }

  createForm(): void{
    this.musicForm = this.formBuilder.group({
      artist: [''],
      titulo: [''],
      duracao:[''],
      genero:['']
    });
  }

  async getArtista(artistaId){
    console.log(artistaId);
    const artista = await this.artistService.listarById(artistaId).toPromise();
    if(artista.code == 200){
      this.artista = artista.dados[0];
      console.log(this.artista);
    }
   }

   onItemSelect(event){
     this.generoEscolhido=this.generoEscolhido+event.item_text+', '

     console.log(this.generoEscolhido);
   }

   onChangeFoto(event){
    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
   }

   onChangeMusica(event){
    const selectedFiles = <FileList>event.srcElement.files;
    this.musicaFile = selectedFiles[0].name
    this.files.add(selectedFiles[0]);
   }
   onChangeVideo(event){
    const selectedFiles = <FileList>event.srcElement.files;
    this.videoFile = selectedFiles[0].name
    this.files.add(selectedFiles[0]);
   }

   setMusica(): void{
    this.musicaBody = {
      artist_id: this.artista.id,
      album_id: 3,
      titulo: this.musicForm.get('titulo').value,
      duracao: this.musicForm.get('duracao').value,
      genero: this.generoEscolhido,
      foto: this.fotoFile,
      url_musica: this.musicaFile,
      url_video: this.videoFile,
    };

    console.log(this.musicaBody);
  }

  async upload(){
    if (this.files && this.files.size > 0) {
      await this.uploadFileService.upload('/music/images', this.files).toPromise();
    }
  }

   async save(){
    this.setMusica();

    const musica = await this.musicService.post('/music', this.musicaBody).toPromise();
    if(musica.code == 200){
      console.log(musica.message);
      await this.upload();
      this.toastr.success(musica.message, 'Sucesso!');
      this.cleanFields();
    }
   }

   dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  cleanFields(){
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.createForm();

    this.files = new Set();
  }

  }
