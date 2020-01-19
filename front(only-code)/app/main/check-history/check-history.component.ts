import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng';
import {PointsService} from '../../services/Points/points.service';
import {Point} from '../../model/point';

@Component({
  selector: 'app-check-history',
  templateUrl: './check-history.component.html',
  styleUrls: ['./check-history.component.css']
})
export class CheckHistoryComponent implements OnInit {
   public points: Point[];
  constructor(private pointService: PointsService) { }

  ngOnInit() {
    this.pointService.points.subscribe(value => this.points = value);
    this.pointService.getPoints();
  }

}
