import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PousarComponent } from './components/pousar/pousar.component';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { CarteiraComponent } from './components/carteira/carteira.component';
import { ContactComponent } from './components/contact/contact.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHelpers } from './service/geral/auth-helpers.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WinnersComponent } from './components/winners/winners/winners.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    Page404Component,
    TopHeaderComponent,
    PolicyComponent,
    PousarComponent,
    PerfilClienteComponent,
    CarteiraComponent,
    ContactComponent,
    WinnersComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHelpers, multi: true,
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
