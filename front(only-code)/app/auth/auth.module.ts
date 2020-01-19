import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/Auth/auth.service';
import {PointsService} from '../services/Points/points.service';
import {ToastModule} from 'primeng';
import {GuardGuard} from '../services/Guard/guard.guard';

const authRotes: Routes = [
  {path: 'login', component : LoginComponent, canActivate: [GuardGuard]},
  {path: 'signup', component : SignupComponent, canActivate: [GuardGuard]},
  {path: '', component : LoginComponent, canActivate: [GuardGuard]}
]

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(authRotes),
    ToastModule
  ],
  exports: [RouterModule],
})
export class AuthModule { }
