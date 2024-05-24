import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroClass } from '../service/geral/filtro-service';
import { ConcursoService } from '../service/concurso/concurso.service';
import { VencedorService } from '../service/vencedor/vencedor.service';
import { UploadFileService } from '../service/upload/upload-file.service';
import { VotacaoService } from '../service/votacao/votacao.service';
import { EncryptionService } from '../service/encryption/encryption.service';
import { SlideService } from '../service/slide/slide.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  musicaLista: [];
  concursoLista: [];
  recargaLista: [];
  vencedorLista: [];
  slideLista;
  isloading: boolean= false;
  musicaCarregar
  concursoCarregar
  recargaCarregar
  vencedorCarregar
  procurarItem:string
  user
  concursos;
  cars = [];
  apiURL = environment.apiURL;
  i = 0;
  votacaoClienteLista: [];
  premiosCliente = new Array<any>();
  selectedOption;
  totalVotos
  valorPremio
  teste = 'assets/img/home/slide3.jpg';
  slideSelecionado: any;



  constructor(
    public pagination: FiltroClass,
    private concursoService: ConcursoService,
    private vencedorService: VencedorService,
    private uploadService: UploadFileService,
    private votacaoService: VotacaoService,
    private slideService: SlideService,
    private encryptionService: EncryptionService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.listarSlides();
    this.concursoPaginacao(1);
    this.vencedorPaginacao(1);
  }

   goArtist(artista){
     console.log(artista);
    this.router.navigate(['/dashboard/artists/artist', artista.artist_id]);
   }

   /**
    * * * Get Concurso
  */
   async listarConcursos(){

    this.isloading= true
     const listagemConcurso= await this.concursoService.listarConcursos(this.pagination.pagination, this.procurarItem).toPromise();
     if(listagemConcurso.code == 200){
       this.isloading= false;
      this.concursoLista= listagemConcurso.dados.data
      this.pagination.pagination.lastPage= listagemConcurso.dados.lastPage;
      this.pagination.pagination.page= listagemConcurso.dados.page;
      this.pagination.pagination.perPage= listagemConcurso.dados.perPage;
      this.pagination.pagination.total = listagemConcurso.dados.total;
      console.log(listagemConcurso);
      // this.carregarConcursos(listagemConcurso.dados.data);
      for (const c of this.concursoLista) {
        this.listarVotacaoPorCliente(c)
      }
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

   /**
    * * * Get Vencedor
  */
    async listarVencedores(){

      this.isloading= true
       const listagemVencedor= await this.vencedorService.listarVencedoresParticipantes(this.pagination.pagination, this.procurarItem).toPromise();
       if(listagemVencedor.code == 200){
         this.isloading= false;
        this.vencedorLista= listagemVencedor.dados.data
        this.pagination.pagination.lastPage= listagemVencedor.dados.lastPage;
        this.pagination.pagination.page= listagemVencedor.dados.page;
        this.pagination.pagination.perPage= listagemVencedor.dados.perPage;
        this.pagination.pagination.total = listagemVencedor.dados.total;
        console.log(listagemVencedor);
        // this.carregarConcursos(listagemConcurso.dados.data);
      }
    }


     vencedorPaginacao(page:number): void{

       if(this.pagination.pagination.page == null){
         this.pagination.pagination.page=1;
       }else{
         this.pagination.pagination.page= page
         this.listarVencedores()
       }

     }

   carregarConcursos(listaconcurso){

      for (let i = 0; i < listaconcurso.length; i++) {
        const element = listaconcurso[i];
        console.log(element);
        this.concursos ={
          id: element.id,
          nome1: element.nome,
          data_inicio1: element.data_inicio,
          descricao1: element.descricao,
          foto1: element.foto,
        }
      }

   }

   goParticipanteList(concurso){
     const encryptedParam1 = this.encryptionService.encryptData(concurso.id);
    //  console.log(encryptedParam1);
     this.router.navigate(['/dashboard/concursos/concurso'], {
      queryParams: {
        id: encryptedParam1
      }
    });
    // this.router.navigate(['/dashboard/concursos/concurso', encryptedParam1]);
   }

     getImageUrl(filename: string){
      return this.uploadService.getImageUrl('/download/images/',filename);
    }

    async listarVotacaoPorCliente(concurso){
      // console.log(this.selectedOption);
      this.isloading= true
       const listagemVotacao= await this.votacaoService.listarByCliente(this.pagination.pagination, concurso.id).toPromise();
       if(listagemVotacao.code == 200){
         this.isloading= false;
        this.votacaoClienteLista= listagemVotacao.dados.data

        for (const [i, vcl] of this.votacaoClienteLista.entries()) {
          if(i == 0){
            await this.calcularPremioPorCliente(vcl, i+1);
          }
        }
      }
    }

    async calcularPremioPorCliente(concurso, posicao){
      console.log('ConcursoID: ' +concurso.votacao_concurso_id);
     await this.getTotalVotosByConcurso(concurso.votacao_concurso_id);
     let totalUM = Number(this.totalVotos * 250);
     let premioConcurso = Number(totalUM*50/100);
     console.log('TOTAL: ' +totalUM+ ' PREMIO: '+premioConcurso);
     console.log('CONCURSO: ' +concurso.votacao_concurso_id+ ' POSICAO: '+posicao);
     if(posicao == 1){
       this.valorPremio = Number(premioConcurso/2);
     }

     this.premiosCliente.push({
       id: concurso.concurso_id,
       nome: concurso.concurso_nome,
       foto: concurso.concurso_foto,
       data_fim:concurso.concurso_data_fim,
       descricao: concurso.concurso_descricao,
       premio: this.valorPremio
     });
     console.log(this.premiosCliente);
    }

     async getTotalVotosByConcurso(data){
      const totalVotos = await this.votacaoService.listarTotalVotosByConcurso(data).toPromise();
      if(totalVotos.code == 200){
        this.totalVotos = totalVotos.dados[0].votos;
        console.log('TOTAL VOTOS: ' + this.totalVotos);
      }
     }

     goVencedoresList(vencedor){
        console.log(vencedor);
      // const encryptedParam1 = this.encryptionService.encryptData(concurso.id);
     //  console.log(encryptedParam1);
      this.router.navigate(['/dashboard/vencedores'], {
       queryParams: {
         concursoId: vencedor.concurso_id,
         concurso_nome: vencedor.concurso_nome
       }
     });
     // this.router.navigate(['/dashboard/concursos/concurso', encryptedParam1]);
    }

    async listarSlides(){
      this.isloading= true
       const listagemSlide= await this.slideService.listarSlide().toPromise();
       if(listagemSlide.code == 200){
         this.isloading= false;
        this.slideLista= listagemSlide.dados
        console.log(this.slideLista);
      }
    }

    setFoto(slide){
      console.log(slide);
     this.slideSelecionado = slide.artist_foto;
   }
}
