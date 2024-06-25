import { Component,EventEmitter,Input, OnInit, Output, ViewChild,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddEntiresService } from 'src/app/service/add-entires/add-entires.service';

@Component({
  selector: 'app-add-entires-modal',
  templateUrl: './add-entires-modal.component.html',
  styleUrls: ['./add-entires-modal.component.css']
})
export class AddEntiresModalComponent implements OnInit {
  @ViewChild('closebutton', { static: false }) closebutton;
  @Input() getConcursoObject: any;
  @Output() sendDataBack = new EventEmitter<any>();
  contestEntryForm: FormGroup;
  concursoObject: any;
  contestEntries:any;
 



  constructor(private addEntiresService:AddEntiresService, private toastr: ToastrService){
    console.log("llllllllllllllllllllllllllllllllll");
  }

  ngOnInit() {
    this.createFrom();
    this.getContestEntries();
    this.concursoObject = this.getConcursoObject;
  }


  createFrom(){
    this.contestEntryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('',),
      link: new FormControl('', Validators.required),
      link_type: new FormControl('facebook', Validators.required),
      vote: new FormControl('',)
    });
  }


  async onSubmit() {
    if (this.contestEntryForm.valid) {
      console.log(this.contestEntryForm.value);
      const formData = await this.addEntiresService.addEntires(this.contestEntryForm.value).toPromise();
      if (formData.code == 201) {
        console.log(".......................................................", formData.dados)
        this.closebutton.nativeElement.click();
        this.toastr.success(formData.message, 'Sucesso!');
        this.contestEntryForm.reset();
       // this.sendDataBack.emit(formData.dados); // Pass the data as an argument
      } else {
        console.log('Form is invalid');
      }
    }
  }


 async getContestEntries() {
    try {
      const response = await this.addEntiresService.getAllEntires().toPromise();
      if(response.code == 200){
        console.log(".......................................................",response.dados)
        this.contestEntries = response.dados;
        console.log(this.contestEntries);

    }
      
    } catch (error) {
      console.error(error);
    }
  }




  
}
