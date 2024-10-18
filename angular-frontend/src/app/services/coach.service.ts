import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coach } from '../models/coach';


//We want access to coach we want to swap after changing pages, so store here
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
