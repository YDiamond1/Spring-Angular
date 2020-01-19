export class Point {
  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get r(): number {
    return this._r;
  }

  set r(value: number) {
    this._r = value;
  }

  get result(): boolean {
    return this.isArea();
  }

  set result(value: boolean) {
    this._result = value;
  }
  private _x: number;
  private _y: number;
  private _r: number;
  private _result: boolean;
  constructor( x, y, r, result ) {
    this._x = x;
    this._y = y;
    this._r = r;
    this._result = result;
  }
  isArea() {
    const sector: boolean = (this._x * this._x + this._y * this._y <= this._r * this._r) && (this._x >= 0 && this._y >= 0);
    const rect: boolean = (this.x <= 0 && this.x >= (-1) * this.r) && (this.y <= 0 && this.y >= (-1) * this.r / 2);
    const triangle: boolean = (this.x >= 0 && this.y <= 0) && (this.x * 0.5 - this.r / 2 <= this.y);
    return sector || rect || triangle;
  }
}
