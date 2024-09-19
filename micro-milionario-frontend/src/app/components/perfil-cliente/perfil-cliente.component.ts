import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { MessageService } from 'src/app/service/message/message.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from 'src/app/service/upload/upload-file.service';
import { TopHeaderService } from 'src/app/service/top-header/top-header.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  imageReponse: any;
  perfilForm: FormGroup;
  perfilBody;
  user
  cliente: any;
  selectedOption
  clienteId
  clientObject;
  fotoFile;
  files: Set<File>;
  updateData;
  fileToUpload: any;
  imageUrl: any;




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
    private location: Location,
    private uploadFileService: UploadFileService,
    private topHeaderService: TopHeaderService,
    private uploadService: UploadFileService,
  ) {


  }

  ngOnInit() {
    this.user = this.auth.pegarUsuario;
    this.getPerfileData();
    this.createForm();
    this.files = new Set();
  }


  getPerfileData() {
    if (this.user.role_name == "CLIENTE-FA") {
      this.getPerfilClienteById(this.user.id);

    } if (this.user.role_name == "ARTISTA") {
      this.getPerfilArtistById(this.user.id);

    }

  }


  async getPerfilArtistById(data) {
    try {
      const cliente = await this.clienteService.getArtistUser(data).toPromise();
      if (cliente.code === 200) {
        this.clientObject = cliente.dados;
        this.preencherData();
      }

    } catch (error) {
      console.error('Error fetching cliente profile:', error);
      this.toastr.error('An error occurred while fetching the cliente profile', 'Error');
    }
  }



  async getPerfilClienteById(data) {
    try {
      const cliente = await this.clienteService.getClientUser(data).toPromise();
      if (cliente.code === 200) {
        this.clientObject = cliente.dados;
        this.preencherData();
      }

    } catch (error) {
      console.error('Error fetching cliente profile:', error);
      this.toastr.error('An error occurred while fetching the cliente profile', 'Error');
    }
  }

  createForm(): void {
    this.perfilForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required), // Make sure this is defined
      password: new FormControl(''),
      conf_password: new FormControl('')
    });

  }

  get emailValidate() {
    return (
      this.perfilForm.get('email').invalid && this.perfilForm.get('email').touched
    )
  }

  get usernameValidate() {
    return (
      this.perfilForm.get('nome').invalid && this.perfilForm.get('nome').touched
    )
  }

  get passwordValidate() {
    return (
      this.perfilForm.get('password').invalid && this.perfilForm.get('password').touched && this.perfilForm.get('password') == this.perfilForm.get('conf_password')
    )
  }

  get telValidate() {
    return (
      this.perfilForm.get('telefone').invalid && this.perfilForm.get('telefone').touched
    )
  }

  get sexoValidate() {
    return (
      this.perfilForm.get('sexo').invalid && this.perfilForm.get('sexo').touched
    );
  }

  setData(): void {
    this.clientObject = {
      nome: this.perfilForm.get('nome').value,
      telefone: this.perfilForm.get('telefone').value,
      email: this.perfilForm.get('email').value,
      sexo: this.perfilForm.get('sexo').value,
      foto: this.imageReponse
    };
  }

  preencherData() {
    this.perfilForm.patchValue({
      nome: this.clientObject.nome,
      email: this.clientObject.email,
      telefone: this.clientObject.telefone,
      sexo: this.clientObject.sexo,
    });
    this.fotoFile = this.clientObject.foto;
  }


  onChangeFoto(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.clear();
    this.files.add(selectedFiles[0]);

  }

 

  update() {
    if (this.user.role_name == "CLIENTE-FA") {
      this.updateClient();

    } if (this.user.role_name == "ARTISTA") {
      this.updateArtist();

    }

  }


  async updateClient() {
    try {
      if (this.perfilForm.valid) {
        console.log('Form Submitted');
      }

      if (this.files) {
        try {
          const imageApi = await this.uploadFileService.upload('/concurso/images', this.files).toPromise();
          if (imageApi.code === 200) {
            this.imageReponse = imageApi.data;
            // Update the client object with the uploaded image response
          } else {
            console.error(`Error uploading image: ${imageApi.mssage}`);
            throw new Error(`Error uploading image: ${imageApi.mssage}`);
          }
        } catch (error) {
          console.error(error);
          this.toastr.error('Erro ao upload imagem!', 'Erro!');
          return;
        }
      }
      this.setData();
      console.log("view", this.clientObject);
      // Update the client with the uploaded image response
      const formData = await this.clienteService.update('/cliente/update/' + this.user.id, this.clientObject).toPromise();
      if (formData.code === 200) {
        this.updateData = formData.dados;
        this.topHeaderService.updateImage(formData.dados);
        this.getImageUrl(this.updateData.foto);
        this.toastr.success(formData.message, 'Sucesso!');
        //this.perfilForm.reset();
      }
    } catch (error) {
      console.error('Error updating cliente:', error);
      this.toastr.error('An error occurred while updating the cliente', 'Error');
    }
  }

  getImageUrl(filename: string) {
    return this.uploadService.getImageUrl('/download/images/', filename);
  }


  async updateArtist() {
    try {

      if (this.perfilForm.valid) {
        console.log('Form Submitted',);
      }
      if (this.files) {
        try {
          const imageApi = await this.uploadFileService.upload('/concurso/images', this.files).toPromise();
          if (imageApi.code === 200) {
            this.imageReponse = imageApi.data;
            // Update the client object with the uploaded image response
          } else {
            console.error(`Error uploading image: ${imageApi.mssage}`);
            throw new Error(`Error uploading image: ${imageApi.mssage}`);
          }
        } catch (error) {
          console.error(error);
          this.toastr.error('Erro ao upload imagem!', 'Erro!');
          return;
        }
      }
      this.setData();
      console.log("view", this.clientObject);
      const formData = await this.clienteService.update('/artist/update/' + this.user.id, this.clientObject).toPromise();

      if (formData.code === 200) {
        this.updateData = formData.dados;
        this.topHeaderService.updateImage(formData.dados);
        this.getImageUrl(this.updateData.foto);
        this.toastr.success(formData.message, 'Sucesso!');
        // this.perfilForm.reset();
      }
    } catch (error) {
      console.error('Error updating cliente:', error);
      this.toastr.error('An error occurred while updating the artist', 'Error');
    }


  }

  goBack() {
    this.location.back();
  }

}
