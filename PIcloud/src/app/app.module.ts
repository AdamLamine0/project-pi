import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HomeComponent } from './modules/home/home.component';
import { PartenaireModule } from './modules/partenaire/partenaire.module';
import { VerifyCertificateComponent } from './pages/verify-certificate/verify-certificate.component';

import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    VerifyCertificateComponent
  ],
  imports: [
    BrowserModule,       // ← includes CommonModule (*ngIf, *ngFor)
    AppRoutingModule,
    RouterModule,
    FormsModule,
    PartenaireModule
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
