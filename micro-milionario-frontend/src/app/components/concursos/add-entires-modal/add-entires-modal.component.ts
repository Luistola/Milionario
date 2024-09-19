import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddEntiresService } from 'src/app/service/add-entires/add-entires.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-entires-modal',
  templateUrl: './add-entires-modal.component.html',
  styleUrls: ['./add-entires-modal.component.css']
})
export class AddEntiresModalComponent implements OnInit{

  @ViewChild('closebutton', { static: false }) closebutton;
  @Input() concursoData: any;
  @Output() sendDataBack = new EventEmitter<any>();
  @Output() closePopupEvent = new EventEmitter();
  showModal = false;
  contestEntryForm: FormGroup;
  concursoId;
  user;

  contestEntries: any;



  constructor(private addEntiresService: AddEntiresService, private toastr: ToastrService, private route: ActivatedRoute,
    private auth: AuthService,
  ) {

  }
  

  ngOnInit() {
    this.user = this.auth.pegarUsuario;
    console.log("user", this.user.id)
    this.route.paramMap.subscribe(paramMap => {
      this.concursoId = paramMap.get('id');

    });
    this.createFrom();
    console.log('Received concurso data:', this.concursoData);
  }


  createFrom() {
    this.contestEntryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      link: new FormControl('', Validators.required),
      link_type: new FormControl('facebook', Validators.required),
      vote: new FormControl(''),
      contest_id: new FormControl(this.concursoId),// <--- corrected line
      artist_id: new FormControl(this.user.id)
    });
  }


  async onSubmit() {
    if (this.contestEntryForm.valid) {
      const formData = await this.addEntiresService.addEntires(this.contestEntryForm.value).toPromise();
      if (formData.code == 201) {
        this.closePopupEvent.emit();
        this.toastr.success(formData.message, 'Sucesso!');
        this.sendDataBack.emit(this.contestEntryForm.value);
      } else if (formData.code == 208) {
        this.toastr.warning('Contest already created', 'Warning!');
      } else {
        console.log('Form is invalid');
      }
    }
  }


  closeModal(): void {
    this.closePopupEvent.emit(); // Emit the close event
  }


}
