import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/service/album/album.service';
import { MusicService } from 'src/app/service/music/music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  artistaId;
  musicas;
  albums

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private musicService: MusicService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.artistaId = paramMap.get('id');

    }
    );

    this.getAlbumByArtist(this.artistaId);
  }

  async getAlbumByArtist(artistaId){
    const album = await this.albumService.listarByArtist(artistaId).toPromise();
    if(album.code == 200){
      this.albums = album.dados[0];
      console.log(this.albums);
    }
   }

}
