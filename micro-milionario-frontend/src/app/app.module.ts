import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHelpers } from './service/geral/auth-helpers.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { PlayerComponent } from './player/player.component';
import { ContactComponent } from './contact/contact.component';
import { RecargaComponent } from './recarga/recarga.component';
import { PipeConcursoPipe } from './pipes/pipe-concurso.pipe';
import { CarteiraComponent } from './carteira/carteira.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VencedoresComponent } from './vencedores/vencedores.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { SharedModule } from './shared/shared.module';
import { PolicyComponent } from './policy/policy.component';
import { PousarComponent } from './pousar/pousar/pousar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MenuComponent,
    TopHeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    Page404Component,
    PlayerComponent,
    ContactComponent,
    RecargaComponent,
    PipeConcursoPipe,
    CarteiraComponent,
    VencedoresComponent,
    PerfilClienteComponent,
    PolicyComponent,
    PousarComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHelpers, multi: true,
    },
    {
      provide:  LocationStrategy, useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
