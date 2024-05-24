import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FiltroClass } from 'src/app/service/geral/filtro-service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-new-utilizador-modal',
  templateUrl: './new-utilizador-modal.component.html',
  styleUrls: ['./new-utilizador-modal.component.css']
})
export class NewUtilizadorModalComponent implements OnInit {

  utilizadorBody;
  utilizadorForm: FormGroup;
  isloading: boolean= false;
  procurarItem:string;
  files: Set<File>;
  roleLista
  @Output() eventoClicado = new EventEmitter();
  @ViewChild('closebutton', {static: false}) closebutton;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    toast: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.listarRoles()
  }

  emitirEvento() {
    this.eventoClicado.emit();
  }

  createForm(): void{
    this.utilizadorForm = this.formBuilder.group({
      username: [''],
      email: [''],
      role: [''],
      password:[''],
      conf_password:['']
    });
  }

  setUtilizador(): void{
    this.utilizadorBody = {
      username: this.utilizadorForm.get('username').value,
      email: this.utilizadorForm.get('email').value,
      role_id: this.utilizadorForm.get('role').value,
      password: this.utilizadorForm.get('password').value
    };

    console.log(this.utilizadorBody);
  }

  get usernameValidate() {
    return(
      this.utilizadorForm.get('username').invalid && this.utilizadorForm.get('username').touched
    )
  }

  get emailValidate() {
    return(
      this.utilizadorForm.get('email').invalid && this.utilizadorForm.get('email').touched
    )
  }

  get passwordValidate() {
    return(
      this.utilizadorForm.get('password').invalid && this.utilizadorForm.get('password').touched && this.utilizadorForm.get('password') == this.utilizadorForm.get('conf_password')
    )
  }

   async save(){
    this.setUtilizador();

    const utilizador = await this.authService.post('/register', this.utilizadorBody).toPromise();
    if(utilizador.code == 200){
      this.toastr.success('Utilizador Salvo Com Sucesso!', 'Sucesso!');
      console.log(utilizador.message);
      this.emitirEvento();
      this.closebutton.nativeElement.click();
    }
   }

   async listarRoles(){
    this.isloading= true
     const listagemRole= await this.authService.listarRoles().toPromise();
     if(listagemRole.code == 200){
       this.isloading= false;
      this.roleLista= listagemRole.dados
      console.log(listagemRole);
    }
  }

  //  rolePaginacao(page:number): void{

  //    if(this.pagination.pagination.page == null){
  //      this.pagination.pagination.page=1;
  //    }else{
  //      this.pagination.pagination.page= page
  //      this.listarRoles()
  //    }

  //  }

}
