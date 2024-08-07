import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopHeaderService {
  private pointsChangedSource = new Subject<any>();
  pointsChanged = this.pointsChangedSource.asObservable();

  updatePoints(points: any) {
    console.log("ppppppppppppppppp",points);
    this.pointsChangedSource.next(points);
  }

  constructor() { }
}
