import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, routing} from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from './services/Auth/auth.service';
import {AuthModule} from './auth/auth.module';
import {MainModule} from './main/main.module';
import {HttpClientModule} from '@angular/common/http';
import {PointsService} from './services/Points/points.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from 'primeng';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    routing,
    AuthModule,
    MainModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, PointsService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
