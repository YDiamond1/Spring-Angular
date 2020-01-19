import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static API_URL = 'http://localhost:21651';
  title = 'Angular-front-end';
}
