import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  cliente:any;
  selectedOption
  clienteId
  clientObject:{}



  
  validationErrors = {
    nome: false,
    telefone: false,
    sexo: false,
    password: false
  };
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    toast: MessageService,
    private location: Location
  ) {
    

  }

  ngOnInit() {
    this.user = this.auth.pegarUsuario;
    this.getPerfileData();
    this.createForm();
  }


  getPerfileData(){
    if(this.user.role_name=="CLIENTE-FA"){
      this.getPerfilClienteById(this.user.id);

    }if(this.user.role_name=="ARTISTA"){
      this.getPerfilArtistById(this.user.id);

    }

  }


async getPerfilArtistById(data) {
    try {
        console.log(",,,artist,,,,,,,,",this.user.role_name)
        const cliente = await this.clienteService.getArtistUser(data).toPromise();
        if (cliente.code === 200) {
            this.clientObject = cliente.dados;
            this.createForm();
        }
      
    } catch (error) {
        console.error('Error fetching cliente profile:', error);
        this.toastr.error('An error occurred while fetching the cliente profile', 'Error');
    }
}



 async getPerfilClienteById(data) {
    try {
        console.log(",,,,,,client,,,,,",this.user.role_name)
        const cliente = await this.clienteService.getClientUser(data).toPromise();
        if (cliente.code === 200) {
            this.clientObject = cliente.dados;
            this.createForm();
        }
      
    } catch (error) {
        console.error('Error fetching cliente profile:', error);
        this.toastr.error('An error occurred while fetching the cliente profile', 'Error');
    }
}

   createForm(): void{
     this.perfilForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      sexo: ['', Validators.required],
      password: ['', Validators.required],
      conf_password: ['', Validators.required]
    });
  }

  get emailValidate(){
    return(
      this.perfilForm.get('email').invalid && this.perfilForm.get('email').touched
    )
  }

  get usernameValidate() {
    return(
      this.perfilForm.get('nome').invalid && this.perfilForm.get('nome').touched
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

  get sexoValidate() {
    return (
      this.perfilForm.get('sexo').invalid && this.perfilForm.get('sexo').touched
    );
  }


   update() {
    if(this.user.role_name=="CLIENTE-FA"){
      this.updateClient();

    }if(this.user.role_name=="ARTISTA"){
      this.updateArtist();

    }
   
}



async updateClient(){
  try {
     
    if (this.perfilForm.valid) {
      console.log('Form Submitted',);
    }
      const formData = await this.clienteService.update('/cliente/update/' + this.user.id, this.clientObject).toPromise();
     
      if (formData.code === 200) {
          this.toastr.success(formData.message, 'Sucesso!');
          //this.perfilForm.reset();
      }
  } catch (error) {
      console.error('Error updating cliente:', error);
      this.toastr.error('An error occurred while updating the cliente', 'Error');
  }

}


async updateArtist(){
  try {
     
    if (this.perfilForm.valid) {
      console.log('Form Submitted',);
    }
      const formData = await this.clienteService.update('/artist/update/' + this.user.id, this.clientObject).toPromise();
     
      if (formData.code === 200) {
          this.toastr.success(formData.message, 'Sucesso!');
         // this.perfilForm.reset();
      }
  } catch (error) {
      console.error('Error updating cliente:', error);
      this.toastr.error('An error occurred while updating the artist', 'Error');
  }


}

  goBack(){
    this.location.back();
  }

}
