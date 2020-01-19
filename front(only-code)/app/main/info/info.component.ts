import {Component, Input, OnInit} from '@angular/core';
import {UserCredentials} from '../../model/user-credentials';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() username: UserCredentials;
  constructor() { }

  ngOnInit() {
  }

}
