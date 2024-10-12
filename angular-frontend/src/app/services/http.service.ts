import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { Player } from '../models/player';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  baseURL: string = "http://localhost:3031";

  getAllTeams(): Observable<HttpResponse<TeamCoachPlayer[]>>{
    return this.http.get<TeamCoachPlayer[]>(this.baseURL + '/teams', {observe: "response"});
  }

  updateTeam(diff_team:TeamCoachPlayer): Observable<HttpResponse<String>>{
    return this.http.put<HttpResponse<String>>(this.baseURL + '/teams', {
      id:diff_team.id,
      teamName:diff_team.teamName,
      numPlayers:diff_team.numPlayers,
      headCoach:diff_team.headCoach,
      players:diff_team.players,
      coaches:diff_team.coaches
    });
  }

  getAllPlayers(): Observable<HttpResponse<Player[]>>{
    return this.http.get<Player[]>(this.baseURL + '/players', {observe: "response"})
  }

  getUnassingedPlayers(): Observable<HttpResponse<Player[]>>{
    return this.http.get<Player[]>(this.baseURL + '/players/unassigned', {observe:"response"});
  }

  updatePlayer(diff_player:Player): Observable<HttpResponse<String>>{
    return this.http.put<HttpResponse<String>>(this.baseURL + '/players', {
      id:diff_player.id,
      firstName:diff_player.firstName, 
      lastName:diff_player.lastName,
      age:diff_player.age,
      position:diff_player.position,
      teamId:diff_player.teamId
    });
  }

  getAllCoaches(): Observable<HttpResponse<Coach[]>>{
    return this.http.get<Coach[]>(this.baseURL + '/coaches', {observe:"response"});
  }

  createCoach(new_coach:Coach): Observable<HttpResponse<String>>{
    console.log(new_coach);
    return this.http.post<HttpResponse<String>>(this.baseURL + '/coaches', {
      firstName:new_coach.firstName,
      lastName:new_coach.lastName,
      age:new_coach.age,
      role:new_coach.role,
      teamId:new_coach.teamId
    });
  }

  deleteCoach(id:number): Observable<HttpResponse<String>>{
    return this.http.delete<HttpResponse<String>>(this.baseURL + '/coaches', {body:{id:id}});
  }
}
