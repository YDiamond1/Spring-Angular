import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PointsService} from '../../services/Points/points.service';
import {Graphic} from '../../model/graphic';
import {ListboxModule, MessageService} from 'primeng';
import {Point} from '../../model/point';
import {isNumeric} from 'rxjs/internal-compatibility';
import {AuthService} from '../../services/Auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CheckHistoryComponent} from '../check-history/check-history.component';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css' ]
})
export class GraphComponent implements OnInit {
  public listOfX = [
    {label: '-2', value: -2},
    {label: '-1.5', value: -1.5},
    {label: '-1', value: -1},
    {label: '-0.5', value: -0.5},
    {label: '0', value: 0},
    {label: '0.5', value: 0.5},
    {label: '1', value: 1},
    {label: '1.5', value: 1.5},
    {label: '2', value: 2}];
  public listOfR = [
    {label: '1', value: 1},
    {label: '1.5', value: 1.5},
    {label: '2', value: 2},
    {label: '2.5', value: 2.5},
    {label: '3', value: 3},
    {label: '3.5', value: 3.5},
    {label: '4', value: 4},
    {label: '4.5', value: 4.5},
    {label: '5', value: 5}];

  @ViewChild('graph', {static: true})
  canvas: ElementRef;
  private selectedX = null;
  public array: Point[];
  private selectedR = null;
  private graphic: Graphic;


  public point: Point = new Point(0, 0, 1, false);
  constructor(private points: PointsService, private message: MessageService, private authService: AuthService) { }

  ngOnInit() {
    this.graphic = new Graphic(this.canvas);
    this.points.points.subscribe(value => this.array = value);
    this.graphic.drawGraphic(5);
  }
  setX() {
    this.point.x = this.selectedX;
  }
  setR() {
    this.graphic.drawGraphic(this.selectedR);
    this.point.r = this.selectedR;
    for (const point of this.array) {
      this.graphic.drawPointR(point, this.selectedR);
    }
  }
  addPoint() {
    if (!isNumeric(this.point.y) || !(-3 <= this.point.y && this.point.y <= 3)) {
      this.error('Wrong y value, (-3 <= y <= 3)');
      return false;
    } else if (!isNumeric(this.point.x) && !(-2 <= this.point.x && this.point.x <= 2)) {
      this.error('Wrong x value');
      return false;
    } else if (!isNumeric(this.point.r) && !(1 <= this.point.r && this.point.r <= 5)) {
      this.error('Wrong r value');
      return false;
    }
    this.points.addPoint(this.point).then(data => {
      this.graphic.drawPoint(data as Point);
      this.points.getPoints();
    }).catch((err: HttpErrorResponse) => {
      console.log('err');
      if (err.status == 401 || err.status == 403) {
        this.authService.logout();
      }
    });
  }
  clickGraphic(event) {
    const SIGN_SEGMENT = 27.27;
    const br = this.canvas.nativeElement.getBoundingClientRect();
    const cornerX = br.x;
    const cornerY = br.y;
    const xPX = event.x - cornerX - 200;
    const yPX = (event.y - cornerY - 200);

    this.point.x = xPX / SIGN_SEGMENT;
    this.point.y = yPX / SIGN_SEGMENT * (-1);
    this.addPoint();
  }
  private error(message: string) {
    this.message.add({severity: 'error', summary: 'Error message', detail: message});
  }
}
