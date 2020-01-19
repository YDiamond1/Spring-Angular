import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../Auth/auth.service';
import {AppComponent} from '../../app.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {Point} from '../../model/point';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  public points: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);
  constructor(private http: HttpClient, private auth: AuthService) {}

  public getPointsRecalculated(r): Observable<any> {
    return this.http.get(AppComponent.API_URL + '/points/recalculate?r=' + r, { headers: this.auth.getHeaders()});
  }
  public getPoints() {
    return this.http.get(AppComponent.API_URL + '/api/points', {headers: this.auth.getHeaders()}).subscribe(data => {
      this.points.next(data as Point[]);
      console.log('points got');
    }, (err: HttpErrorResponse) => {
      if (err.status == 401 || err.status == 403 ) {
        this.auth.logout();
      }
    });
  }
  public addPoint(point: Point) {
    const body = {x: point.x, y: point.y, r: point.r};
    return this.http.post(AppComponent.API_URL + '/api/points/new', body, { headers: this.auth.getHeaders()}).toPromise();
  }
}
