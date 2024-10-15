import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  coachSubject = new BehaviorSubject<Coach>(new Coach(0, '', '', 0, '', 0, ''));

  coach_s = this.coachSubject.asObservable();

  constructor() { }

  setCoach_s(coach_serve:Coach){
    this.coachSubject.next(coach_serve);
  }
}
