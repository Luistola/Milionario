import { ArtistService } from './../../service/artist/artist.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from 'src/app/service/music/music.service';
import { AlbumService } from 'src/app/service/album/album.service';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistaId;
  artista;
  musicas;
  albums

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private musicService: MusicService,
    private albumService: AlbumService,
    private router: Router,
    private uploadService: UploadFileService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.artistaId = paramMap.get('id');
    });

    this.getArtista(this.artistaId);
    // this.getMusicaByArtist(this.artistaId);
    // this.getAlbumByArtist(this.artistaId);
  }

  async getArtista(artistaId){
    const artista = await this.artistService.listarById(artistaId).toPromise();
    if(artista.code == 200){
      this.artista = artista.dados[0];
      console.log(this.artista);
    }
   }

   async getMusicaByArtist(artistaId){
    const musica = await this.musicService.listarByArtist(artistaId).toPromise();
    if(musica.code == 200){
      this.musicas = musica.dados;
      console.log(this.musicas);
    }
   }

   async getAlbumByArtist(artistaId){
    const album = await this.albumService.listarByArtist(artistaId).toPromise();
    if(album.code == 200){
      this.albums = album.dados;
      console.log(this.albums);
    }
   }

   goAlbum(album){
     console.log(album);
    this.router.navigate(['/dashboard/artists/album', album.artist_id]);
   }

   getImageUrl(filename: string){
    return this.uploadService.getImageUrl('/download/images/',filename);
  }

  goBack(){
    this.location.back();
  }

}
