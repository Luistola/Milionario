import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/user/usuario';
import { AuthService } from '../service/auth/auth.service';
import { ConcursoService } from '../service/concurso/concurso.service';
import { FiltroClass } from '../service/geral/filtro-service';
import { MessageService } from '../service/message/message.service';
import { VencedorClienteService } from '../service/vencedor-cliente/vencedor-cliente.service';
import { VencedorService } from '../service/vencedor/vencedor.service';
import { VotacaoService } from '../service/votacao/votacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: Usuario;
  utilizadorEmail;
  loader:boolean = false;
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
    public pagination: FiltroClass,
    private router: Router,
    private toastr: ToastrService,
    toast: MessageService,

  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void{
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
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

  setUsuario(emailUtilizador): void{
    this.usuario = {
      email: emailUtilizador,
      password: this.loginForm.get('password').value
    };

    this.login();
  }

  async buscaUtilizadorPeloTelefone(data){
    const utilizador = await this.authService.buscaUserByPhone(data).toPromise();
    if(utilizador.code == 200){
      this.utilizadorEmail = utilizador.dados[0].email;
      this.setUsuario(this.utilizadorEmail)
      setInterval(() => this.login(), 3000);
      // console.log(this.utilizadorEmail);
    }
   }

   async verificarValor() {
    if (isNaN(this.loginForm.get('name').value)) {
      console.log('O valor digitado não é um número válido!');
      this.utilizadorEmail = this.loginForm.get('name').value;
      this.setUsuario(this.utilizadorEmail);
      this.login();
    } else {
      console.log('O valor digitado é um número válido!');
      await this.buscaUtilizadorPeloTelefone(this.loginForm.get('name').value);
    }
  }

  login(): void{
    this.loader = true;
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.authService.login(this.usuario).subscribe(async (data:any) => {
        this.toastr.success('Login Com Sucesso!', 'Sucesso!');
        await this.findWinner(this.dataActual);
        this.loader = false;
        this.router.navigate(['/dashboard']);
      }, error =>{
        this.loader = false;
        this.toastr.error('Acesso Negado!', 'Erro!');
        console.log(error);
      });
    }

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

  ngOnDestroy() {
    location.reload();
  }

}
