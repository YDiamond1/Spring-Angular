import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';
import {UserCredentials} from '../../model/user-credentials';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: UserCredentials = new UserCredentials('', '');
  public isFocusUsername = false;
  public isFocusPassword = false;
  private errorMessage: string;
  constructor(private auth: AuthService, private router: Router, private service: MessageService) { }
  editUsername() {
    if (this.user.username === '') {
      this.isFocusUsername = !this.isFocusUsername;
    }
  }
  editPassword() {
    if (this.user.password === '')
    this.isFocusPassword = !this.isFocusPassword;
  }

  ngOnInit() {
    this.user = new UserCredentials('', '');
    this.errorMessage = '';
  }
  login() {
    this.auth.login(this.user).subscribe(resp => { this.router.navigate(['/main']); } , (err: HttpErrorResponse) => {
      console.log(err);
      switch (err.status) {
        case 0:
          this.errorMessage = 'Unable to connect to backend service';
          break;
        case 401:
          this.errorMessage = 'username or password is wrong';
          break;
        default:
          this.errorMessage = 'unknown error ' + err.status;
      }
      this.service.add({severity: 'error', summary: 'Error message', detail: this.errorMessage});
    });
  }
}
