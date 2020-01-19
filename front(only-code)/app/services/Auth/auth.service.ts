import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserCredentials} from '../../model/user-credentials';
import {AppComponent} from '../../app.component';
import {tap} from 'rxjs/operators';
import {ResponseMessage} from '../../model/response-message';
import {CheckHistoryComponent} from '../../main/check-history/check-history.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth = false;
  public message: string;
  constructor(private http: HttpClient, private router: Router) { }

  createAcc(user: UserCredentials) {
    return this.http.post(AppComponent.API_URL + '/api/users/signup', user)
      .pipe(tap
      (    data => {this.message = data as string; return data; } , error => {this.message = error as string; console.log(error); }
      )
      );
  }

  login(user: UserCredentials) {
    return this.http.post(AppComponent.API_URL + '/api/users/login', user, { headers: new HttpHeaders().set('Accept', 'application/json')}).pipe(tap(data => {
      const token = ( data as ResponseMessage).message;

      localStorage.setItem('authToken', token as string);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isAuth = true;
    }, error => {
      console.log('login error: ' + error);
    }));
  }
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + token);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  logout() {
    // tslint:disable-next-line:max-line-length
    const isLogout = this.http.post(AppComponent.API_URL + '/api/users/logout', JSON.parse(localStorage.getItem('currentUser')) as UserCredentials, {headers : this.getHeaders()})
      .subscribe(data => console.log(data), error1 => console.log(error1)).add(
        () => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          window.location.reload();
        }
      );

  }
}
