import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/components/login/login.component';
import { SignupComponent } from './Login/components/signup/signup.component';
import { ManagementModule } from './Management/management.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ManagementModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
