import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/user/usuario';
import { AuthService } from '../service/auth/auth.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { ArtistService } from '../service/artist/artist.service';
import { CarteiraService } from '../service/carteira/carteira.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../service/message/message.service';
import { UploadFileService } from '../service/upload/upload-file.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  userBody;
  carteiraBody;
  usuario: Usuario;
  selectedOption;
  fotoFile;
  files: Set<File>;
  @ViewChild('inputFile', {static: false}) fileInputRef: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private clienteService: ClienteService,
    private artistService: ArtistService,
    private carteiraService: CarteiraService,
    private uploadFileService: UploadFileService,
    private router: Router,
    private toastr: ToastrService,
    toast: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.files = new Set();
  }

  createForm(): void{
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      role:['', [Validators.required]],
      telefone:['', [Validators.required]],
      sexo:['', [Validators.required]],
      foto: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      password: ['', [Validators.required]],
      conf_password: ['']
    });
  }

  register(){
    this.router.navigate(['/login']);
  }

  get usernameValidate() {
    return(
      this.registerForm.get('username').invalid && this.registerForm.get('username').touched
    )
  }

  get emailValidate() {
    return(
      this.registerForm.get('email').invalid && this.registerForm.get('email').touched
    )
  }

  get passwordValidate() {
    return(
      this.registerForm.get('password').invalid && this.registerForm.get('password').touched && this.registerForm.get('password') == this.registerForm.get('conf_password')
    )
  }

  get telValidate() {
    return(
      this.registerForm.get('telefone').invalid && this.registerForm.get('telefone').touched
    )
  }

  onChangeFoto(event){
    const selectedFiles = <FileList>event.srcElement.files;
    this.fotoFile = selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
    // console.log(selectedFiles[0]);
  }

  setUsuario(): void{
    this.usuario = {
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      role_id: this.registerForm.get('role').value,
      password: this.registerForm.get('password').value
    };
  }

  setCliente(user): void{
    this.userBody = {
      user_id: user.id,
      nome: this.registerForm.get('username').value,
      telefone: this.registerForm.get('telefone').value,
      sexo: this.registerForm.get('sexo').value,
    };

    console.log(this.userBody);
  }

  setArtista(user): void{
    this.userBody = {
      user_id: user.id,
      nome: this.registerForm.get('username').value,
      telefone: this.registerForm.get('telefone').value,
      sexo: this.registerForm.get('sexo').value,
      foto: this.fotoFile,
      facebook: this.registerForm.get('facebook').value,
      instagram: this.registerForm.get('instagram').value,
      twitter: this.registerForm.get('twitter').value
    };

    console.log(this.userBody);
  }

  setCarteira(user): void{
    this.carteiraBody = {
      user_id: user.id,
      pontos: 0,
    };

    console.log(this.carteiraBody);
  }

  async upload(){
    if (this.files && this.files.size > 0) {
      await this.uploadFileService.upload('/artist/images', this.files).toPromise();
    }
  }

  async save(){
    if(this.registerForm.invalid){
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setUsuario();
      this.authService.register(this.usuario).subscribe(async (data:any) => {
        console.log(data.dados);
        if(this.usuario.role_id == '2'){
          this.setArtista(data.dados);
          await this.saveArtist(this.userBody);
          // await this.saveCarteira(this.carteiraBody);
        }else{
          this.setCliente(data.dados);
          this.setCarteira(data.dados);
          await this.saveCliente(this.userBody);
          await this.saveCarteira(this.carteiraBody);
        }
        this.toastr.success('Registado Com Sucesso!', 'Sucesso!');
        console.log('Registado Com Sucesso!');
        this.router.navigate(['/login']);
      }, error =>{
        this.toastr.error('Erro ao registar!', 'Erro!');
        console.log(error);
      });
    }
  }

  async saveCliente(user){

    const cliente = await this.clienteService.post('/cliente', user).toPromise();
    if(cliente.code == 200){
      console.log(cliente.message);
    }else{
      console.log(cliente.code);
    }
  }

  async saveArtist(user){

    const artista = await this.artistService.post('/artist', user).toPromise();
    if(artista.code == 200){
      await this.upload();
      console.log(artista.message);
    }else{
      console.log(artista.code);
    }
  }

  async saveCarteira(user){

    const carteira = await this.carteiraService.post('/carteira', user).toPromise();
    if(carteira.code == 200){
      console.log(carteira.message);
    }else{
      console.log(carteira.code);
    }
  }

}
