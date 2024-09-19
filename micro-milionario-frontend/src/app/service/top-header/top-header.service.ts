import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopHeaderService {
  private pointsChangedSource = new Subject<any>();
  private imageChangedSource = new Subject<any>();

  pointsChanged = this.pointsChangedSource.asObservable();
  imageChanged = this.imageChangedSource.asObservable();

  updatePoints(points: any) {
    this.pointsChangedSource.next(points);
  }

  updateImage(image: any) {
    console.log("image data", image);
    this.imageChangedSource.next(image);
  }

  constructor() { }
}
