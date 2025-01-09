import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicModule } from 'src/app/public/public.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedModule } from './protected/protected.module';

import 'moment/locale/fr';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    ProtectedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
