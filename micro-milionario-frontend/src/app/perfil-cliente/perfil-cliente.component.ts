import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth/auth.service';
import { ClienteService } from '../service/cliente/cliente.service';
import { MessageService } from '../service/message/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  perfilForm:FormGroup;
  perfilBody;
  user
  cliente;
  selectedOption

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    toast: MessageService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.user = this.auth.pegarUsuario;
    this.getCliente(this.user);
    this.createForm();
  }

  async getCliente(user){
    const cliente = await this.clienteService.listarByUser(user.id).toPromise();
    if(cliente.code == 200){
      this.cliente = cliente.dados[0];
    }
   }

  createForm(): void{
    this.perfilForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      telefone:['', [Validators.required]],
      sexo:['', [Validators.required]],
      password: ['', [Validators.required]],
      new_password: [''],
      conf_password: ['']
    });
  }

  get usernameValidate() {
    return(
      this.perfilForm.get('username').invalid && this.perfilForm.get('username').touched
    )
  }

  get passwordValidate() {
    return(
      this.perfilForm.get('password').invalid && this.perfilForm.get('password').touched && this.perfilForm.get('password') == this.perfilForm.get('conf_password')
    )
  }

  get telValidate() {
    return(
      this.perfilForm.get('telefone').invalid && this.perfilForm.get('telefone').touched
    )
  }

  setCliente(): void{
    this.perfilBody = {
      nome: this.perfilForm.get('username').value,
      telefone: this.perfilForm.get('telefone').value,
      sexo: this.perfilForm.get('sexo').value,
    };

    console.log(this.perfilBody);
  }

  async update(){
    this.setCliente();
    const cliente = await this.clienteService.update('/cliente/update/'+this.cliente.id, this.perfilBody).toPromise();
    if(cliente.code == 200){
      console.log(cliente.message);
      this.toastr.success(cliente.message, 'Sucesso!');
    }
  }

  goBack(){
    this.location.back();
  }

}
