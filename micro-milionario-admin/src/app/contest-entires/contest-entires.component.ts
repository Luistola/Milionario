import { Component, OnInit } from '@angular/core';
import { ContestEntiresService } from '../service/contest-entires/contest-entires.service';
import { ToastrService } from 'ngx-toastr';
import { FiltroEntriesClass } from '../service/geral/filter-entires-service';
import { EntiresInterface } from '../service/geral/geral-interface-listar';
import { ConcursoService } from '../service/concurso/concurso.service';

@Component({
  selector: 'app-contest-entires',
  templateUrl: './contest-entires.component.html',
  styleUrls: ['./contest-entires.component.css']
})
export class ContestEntiresComponent implements OnInit {
  contestEntriesLista: [];
  editStatus: EntiresInterface;
  entiresList: EntiresInterface[] = []; // define entiresList here
  concursoLista: [];
  selectedOption
  ContestBYEntries

  constructor(private addEntiresService: ContestEntiresService, private toastr: ToastrService, public pagination: FiltroEntriesClass,
    private concursoService: ConcursoService,
  ) {


  }

  ngOnInit() {
    this.listarConcursos();
  }

  carregarListas(){
    this.getEntryByContest(this.selectedOption);
  }



  async getContestEntries() {
    try {
      const response = await this.addEntiresService.getAllEntires(this.pagination.pagination).toPromise();
      if (response.code == 200) {
        this.contestEntriesLista = response.dados.data;
        this.pagination.pagination.lastPage = response.dados.lastPage;
        this.pagination.pagination.page = response.dados.page;
        this.pagination.pagination.perPage = response.dados.perPage;
        this.pagination.pagination.total = response.dados.total;
      
      }

    } catch (error) {
      console.error(error);
    }
  }

  async updateStatus(entiresID: number, entires: EntiresInterface) {
    console.log("first", entires.status);
    try {
      entires.status =!entires.status; // toggle the status
      this.editStatus = {...entires }; // create a copy of the entires object
      const response = await this.addEntiresService.updateEntiresStatus(entiresID, this.editStatus).toPromise();
      if (response.code == 201) {
        console.log(".......................................................", response.dados)
        // update the original entires object in your component's state
        this.entiresList = this.entiresList.map(e => e.id === entiresID? this.editStatus : e);
      }
    } catch (error) {
      console.error(error);
    }
  }


  async listarConcursos(){
   
    const listagemConcurso= await this.concursoService.adminlistarConcursos(this.pagination.adminpagination).toPromise();
    if(listagemConcurso.code == 200){
     this.concursoLista= listagemConcurso.dados.data
     this.pagination.pagination.lastPage= listagemConcurso.dados.lastPage;
     this.pagination.pagination.page= listagemConcurso.dados.page;
     this.pagination.pagination.perPage= listagemConcurso.dados.perPage;
     this.pagination.pagination.total = listagemConcurso.dados.total;

   }
 }



 


 async getEntryByContest(selectedOption) {
  try {
    const fetEntryByContest = await this.concursoService.getEntryByContest(selectedOption).toPromise();
    if (fetEntryByContest.code == 200) {
      this.ContestBYEntries = fetEntryByContest.dados;
      if(this.ContestBYEntries.length==0){
        this.toastr.warning('as integrações do concurso não existem');

      }
    }
  } catch (error) {
    console.error("Error fetching contest entries:", error);
    // You can also add additional error handling logic here, such as displaying an error message to the user
  }
}


  concursoEntiresPagination(page: number): void {

    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.getContestEntries()
    }

  }


 



}
