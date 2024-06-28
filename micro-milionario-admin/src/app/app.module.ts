import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHelpers } from './service/geral/auth-helpers.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { Page404Component } from './page404/page404.component';
import { ShareModuloModule } from './share-modulo/share-modulo.module';
import { VotacaoComponent } from './votacao/votacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VencedorParticipanteComponent } from './vencedor-participante/vencedor-participante.component';
import { ParametroComponent } from './parametro/parametro.component';
import { SlideComponent } from './slide/slide.component';
import { ContactoComponent } from './contacto/contacto.component';
import { VerFotoSlideComponent } from './slide/ver-foto-slide/ver-foto-slide.component';
import { PousarComponent } from './pousar/pousar.component';
import { ContestEntiresComponent } from './contest-entires/contest-entires.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TopHeaderComponent,
    Page404Component,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    VotacaoComponent,
    VencedorParticipanteComponent,
    ParametroComponent,
    SlideComponent,
    ContactoComponent,
    VerFotoSlideComponent,
    PousarComponent,
    ContestEntiresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ShareModuloModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHelpers, multi: true
    },
    {
      provide:  LocationStrategy, useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
