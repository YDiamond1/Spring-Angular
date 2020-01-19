import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/Auth/auth.service';
import {UserCredentials} from '../model/user-credentials';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: UserCredentials;
  public isInfo = false;

  constructor(private auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }
  clickinfo() {
    this.isInfo = !this.isInfo;
  }
}
