import { Component, OnInit } from '@angular/core';
import { ContestEntiresService } from '../service/contest-entires/contest-entires.service';
import { ToastrService } from 'ngx-toastr';
import { FiltroEntriesClass } from '../service/geral/filter-entires-service';
import { EntiresInterface } from '../service/geral/geral-interface-listar';

@Component({
  selector: 'app-contest-entires',
  templateUrl: './contest-entires.component.html',
  styleUrls: ['./contest-entires.component.css']
})
export class ContestEntiresComponent implements OnInit {
  contestEntriesLista: [];
  editStatus: EntiresInterface;
  entiresList: EntiresInterface[] = []; // define entiresList here


  constructor(private addEntiresService: ContestEntiresService, private toastr: ToastrService, public pagination: FiltroEntriesClass,) {


  }

  async getContestEntries() {
    try {
      const response = await this.addEntiresService.getAllEntires(this.pagination.pagination).toPromise();
      if (response.code == 200) {
        console.log(".......................................................", response.dados)
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



  concursoEntiresPagination(page: number): void {

    if (this.pagination.pagination.page == null) {
      this.pagination.pagination.page = 1;
    } else {
      this.pagination.pagination.page = page
      this.getContestEntries()
    }

  }


  ngOnInit() {
    this.concursoEntiresPagination(this.pagination.pagination.page);
  }



}
