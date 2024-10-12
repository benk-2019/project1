import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamSimple } from '../models/team-simple';

@Injectable({
  providedIn: 'root'
})
export class TeamListService {

  //create team list subject
  teamListSubject = new BehaviorSubject<TeamSimple[]>([]);

  //create observable to subscribe to
  teamList = this.teamListSubject.asObservable();

  constructor() { }

  //take data from sending side, set next for subject to emit update notification
  //to subjects observables
  setTeamList(newTeamList:TeamSimple[]){
    this.teamListSubject.next(newTeamList);
  }
}
