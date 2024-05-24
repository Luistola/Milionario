import { AuthService } from './../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../service/message/message.service';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';
import { VotacaoService } from '../service/votacao/votacao.service';
import { VencedorService } from '../service/vencedor/vencedor.service';
import { VencedorClienteService } from '../service/vencedor-cliente/vencedor-cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: Usuario;
  concursos;
  votacaoParticipanteLista: [];
  votacaoClienteLista: [];
  procurarItem:string;
  isloading: boolean= false;
  dataActual = new Date();
  dataFormatada;
  vencedorBody;
  vencedorClienteBody;
  totalVotos
  valorPremio

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private concursoService: ConcursoService,
    private votacaoService: VotacaoService,
    private vencedorService: VencedorService,
    private vencedorClienteService: VencedorClienteService,
    private router: Router,
    private toastr: ToastrService,
    public pagination: FiltroClass,
    toast: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  login(): void{
    this.isloading = true;
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setUsuario();
      this.authService.login(this.usuario).subscribe(async (data:any) => {
        this.toastr.success('Login Com Sucesso!', 'Sucesso!');
        console.log('Login Com Sucesso!');
        await this.findWinner(this.dataActual);
        this.isloading = false;
        this.router.navigate(['/dashboard']);
      }, error =>{
        this.isloading = false;
        console.log(error);
      });
    }
  }

  ngOnDestroy() {
    location.reload();
  }

  get emailValidate() {
    return(
      this.loginForm.get('email').invalid && this.loginForm.get('email').touched
    )
  }

  get passwordValidate() {
    return(
      this.loginForm.get('password').invalid && this.loginForm.get('password').touched
    )
  }

  createForm(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }

  setUsuario(): void{
    this.usuario = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
  }

  formataData(d){
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    this.dataFormatada = curr_year + "-" + curr_month + "-" + curr_date;
    console.log(this.dataFormatada);
  }

  async findWinner(data){
    this.formataData(data)
    console.log('DATA ACTUAL:' +this.dataFormatada);
    await this.getConcursoByDataFim(this.dataFormatada);
    if (this.concursos) {
      for (const c of this.concursos) {
        await this.listarVotacaoPorParticipante(c.id);
        await this.listarVotacaoPorCliente(c.id);
        await this.closeConcursos(c.id);
      }
    }

  }

  async getConcursoByDataFim(data){
    const concursos = await this.concursoService.listarByDataFim(data).toPromise();
    if(concursos.code == 200){
      this.concursos = concursos.dados;
      console.log(this.concursos);
    }
   }

   async closeConcursos(id){
    let concursoBody = {
      id: id,
      is_active: 1
    }

    const concurso = await this.concursoService.update('/concurso/update/'+id, concursoBody).toPromise();
    if(concurso.code == 200){
      console.log(concurso.message);
      this.toastr.success(concurso.message, 'Sucesso!');
    }
   }

   async listarVotacaoPorParticipante(concursoId){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVotacao= await this.votacaoService.listarByConcurso(this.pagination.pagination, concursoId).toPromise();
     if(listagemVotacao.code == 200){
       this.isloading= false;
      this.votacaoParticipanteLista= listagemVotacao.dados.data
      console.log(this.votacaoParticipanteLista);
      for (const [i, v] of this.votacaoParticipanteLista.entries()) {
        console.log('Posicao A: ' +i);
        console.log('Participante 1: ' +v);
        await this.saveVencedor(v, i+1);
      }

    }
  }

  async listarVotacaoPorCliente(concursoId){
    // console.log(this.selectedOption);
    this.isloading= true
     const listagemVotacao= await this.votacaoService.listarByCliente(this.pagination.pagination, concursoId).toPromise();
     if(listagemVotacao.code == 200){
       this.isloading= false;
      this.votacaoClienteLista= listagemVotacao.dados.data
      console.log(this.votacaoClienteLista);
      for (const [i, v] of this.votacaoClienteLista.entries()) {
        console.log('Posicao A: ' +i);
        console.log('Cliente 1: ' +v);
        await this.saveVencedorCliente(v, i+1);
      }

    }
  }

  setVencedores(participante, posicao, premio): void{
    this.formataData(this.dataActual)
    this.vencedorBody = {
      concurso_id: participante.votacao_concurso_id,
      participante_id: participante.participante_id,
      posicao: posicao,
      total_votos: participante.votos,
      premio: premio,
      data: this.dataFormatada

    };

    console.log(this.vencedorBody);
  }

  setVencedorCliente(cliente, posicao, premio): void{
    this.formataData(this.dataActual)
    this.vencedorClienteBody = {
      concurso_id: cliente.votacao_concurso_id,
      cliente_id: cliente.votacao_cliente_id,
      posicao: posicao,
      total_votos: cliente.votos,
      premio: premio,
      data: this.dataFormatada

    };

    console.log(this.vencedorClienteBody);
  }

  async saveVencedor(participante, posicao){
    await this.calcularPremio(participante.votacao_concurso_id, posicao);
    this.setVencedores(participante, posicao, this.valorPremio);

    const vencedor = await this.vencedorService.post('/vencedor', this.vencedorBody).toPromise();
    if(vencedor.code == 200){
      this.toastr.success(vencedor.message, 'Sucesso!');
      console.log(vencedor.message);
    }
   }

   async saveVencedorCliente(cliente, posicao){
    await this.calcularPremio(cliente.votacao_concurso_id, posicao);
    this.setVencedorCliente(cliente, posicao, this.valorPremio);

    const vencedor = await this.vencedorClienteService.post('/vencedor-cliente', this.vencedorClienteBody).toPromise();
    if(vencedor.code == 200){
      this.toastr.success(vencedor.message, 'Sucesso!');
      console.log(vencedor.message);
    }
   }

   async calcularPremio(concursoId, posicao){
    await this.getTotalVotosByConcurso(concursoId);
    let totalUM = Number(this.totalVotos * 250);
    let premioConcurso = Number(totalUM*50/100);
    console.log('TOTAL: ' +totalUM+ ' PREMIO: '+premioConcurso);
    console.log('CONCURSO: ' +concursoId+ ' POSICAO: '+posicao);
    if(posicao == 1){
      this.valorPremio = Number(premioConcurso/2);
    } else if(posicao == 2){
      this.valorPremio = Number(premioConcurso/4);
    } else if(posicao == 3){
      this.valorPremio = Number(premioConcurso/6);
    }
    console.log(this.valorPremio);
   }

   async getTotalVotosByConcurso(data){
    const totalVotos = await this.votacaoService.listarTotalVotosByConcurso(data).toPromise();
    if(totalVotos.code == 200){
      this.totalVotos = totalVotos.dados[0].votos;
      console.log(this.totalVotos);
    }
   }

}
