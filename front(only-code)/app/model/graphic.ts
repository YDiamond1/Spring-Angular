import {ElementRef} from '@angular/core';
import {Point} from './point';

export class Graphic {
  private canvas: ElementRef;

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
  }
  drawPoint(point: Point) {
    const SING_SEGMENT = 27.27;
    const x = point.x, y = point.y, r = point.r, hit = point.result;

    console.log('Marking point ' + x + ', ' + y + ', ' + hit);

    const context = this.canvas.nativeElement.getContext('2d');

    context.beginPath();
    context.rect(Math.round(200 + x * SING_SEGMENT) - 3, Math.round(200 - y * SING_SEGMENT) - 3, 6, 6);
    context.closePath();
    context.strokeStyle = 'black';

    let color = 'red';

    if (hit) {
      color = 'lime';
    }

    context.fillStyle = color;
    context.fill();
    context.stroke();

  }


  drawPointR(point: Point, R: number) {
    const SING_SEGMENT = 27.27;
    const x = point.x, y = point.y, r = point.r, hit = point.result;

    console.log('Marking point ' + x + ', ' + y + ', ' + hit);

    const context = this.canvas.nativeElement.getContext('2d');

    context.beginPath();
    context.rect(Math.round(200 + x * SING_SEGMENT) - 3, Math.round(200 - y * SING_SEGMENT) - 3, 6, 6);
    context.closePath();
    context.strokeStyle = 'black';

    let color = 'red';

    if (hit) {
      color = 'lime';
    }
    if (r != R) {
      color = '#fa27ff';
    }

    context.fillStyle = color;
    context.fill();
    context.stroke();

  }


  drawGraphic(r: number) {
    console.log('Drawing graphic with R=' + r);
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const SING_SEGMENT = 27.27;

    // sector
    context.beginPath();
    context.moveTo(200, 200);
    context.arc(200, 200, r * SING_SEGMENT, 0, - Math.PI / 2, true);
    context.closePath();
    context.strokeStyle = '#2f9aff';
    context.fillStyle = '#2f9aff';
    context.fill();
    context.stroke();

    // rectangle
    context.beginPath();
    context.rect(50 + (150 - r * SING_SEGMENT), 200, r * SING_SEGMENT, r * SING_SEGMENT / 2);
    context.closePath();
    context.strokeStyle = '#2f9aff';
    context.fillStyle = '#2f9aff';
    context.fill();
    context.stroke();



    // triangle
    context.beginPath();
    context.moveTo(200, 200);
    context.lineTo(200 + r * SING_SEGMENT, 200);
    context.lineTo(200, 200 + r * SING_SEGMENT / 2);
    context.lineTo(200, 200);
    context.closePath();
    context.strokeStyle = '#2f9aff';
    context.fillStyle = '#2f9aff';
    context.fill();
    context.stroke();

    // axes
    context.beginPath();
    context.font = '10px Verdana';
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.moveTo(200, 29);
    context.lineTo(200, 371);
    context.moveTo(200, 29);
    context.lineTo(195, 44);
    context.moveTo(200, 29);
    context.lineTo(205, 44);
    context.fillText('Y', 210, 39);
    context.moveTo(29, 200);
    context.lineTo(371, 200);
    context.lineTo(356, 195);
    context.moveTo(371, 200);
    context.lineTo(356, 205);
    context.fillText('X', 361, 190);
    context.stroke();

    // Y parts
    for ( let i = -5; i <= 5; i++) {
      if (i != 0) {
        context.moveTo(195, 200 - i * SING_SEGMENT);
        context.lineTo(205, 200 - i * SING_SEGMENT);
        context.fillText(i.toString(), 210, 200 - i * SING_SEGMENT);
      } else {
        context.fillText(i.toString(), 205, 200 - i * SING_SEGMENT - 5);
      }
    }

    // X parts
    for (let i = -5; i <= 5 ; i++) {
      if (i != 0) {
        context.moveTo(200 + i * SING_SEGMENT, 195);
        context.lineTo(200 + i * SING_SEGMENT, 205);
        context.fillText(i.toString(), 200 + i * SING_SEGMENT, 190);
      }
    }

    context.closePath();
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.stroke();
  }
}
