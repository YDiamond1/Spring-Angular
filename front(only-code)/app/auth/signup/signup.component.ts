import { Component, OnInit } from '@angular/core';
import {UserCredentials} from '../../model/user-credentials';
import {AuthService} from '../../services/Auth/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public user: UserCredentials;
  public  errorMessage: string;
  public isFocusUsername = false;
  public isFocusPassword = false;
  constructor(private auth: AuthService, private router: Router, private service: MessageService) { }
  editUsername() {
    if (this.user.username === '') {
      this.isFocusUsername = !this.isFocusUsername;
    }
  }
  editPassword() {
    if (this.user.password === '') {
      this.isFocusPassword = !this.isFocusPassword;
    }
  }
  ngOnInit() {
    this.user = new UserCredentials('', '' );
  }
  submit() {
    if (this.user.password.length >= 6 ) {
      this.auth.createAcc(this.user).subscribe(data => {
        this.router.navigate(['/auth/login']).then();
      }, (err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status) {
          case 0:
            this.errorMessage = 'Unable to connect to backend service';
            break;
          case 409:
            this.errorMessage = 'username already exist';
            break;
          default:
            this.errorMessage = 'unknown error ' + err.status;
        }
        this.service.add({severity: 'error', summary: 'Error message', detail: this.errorMessage});
      });

    } else {
      this.service.add({severity: 'error', summary: 'Error message', detail: 'Login or password doesn\'t satisfy: password must have more 6 characters'});
    }
    return false;
  }
}

