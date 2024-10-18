import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
  //Basic http requests with custom bodies to fit the backends expectations
  constructor(private http: HttpClient) { }
  
  baseURL: string = "http://localhost:3031";

  getAllTeams(): Observable<HttpResponse<TeamCoachPlayer[]>>{
    return this.http.get<TeamCoachPlayer[]>(this.baseURL + '/teams', {observe: "response"});
  }

  getTeamById(id:number): Observable<HttpResponse<TeamCoachPlayer>>{
    return this.http.get<TeamCoachPlayer>(this.baseURL + `/teams/${id}`, {observe:'response'});
  }

  updateTeam(diff_team:TeamCoachPlayer): Observable<HttpResponse<String>>{
    return this.http.put<HttpResponse<String>>(this.baseURL + '/teams', {
      id: diff_team.id,
      teamName: diff_team.teamName,
      numPlayers: diff_team.numPlayers,
      headCoach: diff_team.headCoach,
      players: diff_team.players,
      coaches: diff_team.coaches
    });
  }

  createTeam(new_team:TeamCoachPlayer): Observable<HttpResponse<String>>{
    return this.http.post<HttpResponse<String>>(this.baseURL + '/teams', {
      teamName: new_team.teamName,
      headCoach: new_team.headCoach,
      numPlayers: new_team.numPlayers,
      players: new_team.players,
      coaches: new_team.coaches
    })
  }

  deleteTeam(id:number): Observable<HttpResponse<String>>{
    return this.http.delete<HttpResponse<String>>(this.baseURL + '/teams', {body:{id:id}});
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

  createPlayer(new_player:Player): Observable<HttpResponse<String>>{
    return this.http.post<HttpResponse<String>>(this.baseURL + '/players', {
      firstName:new_player.firstName,
      lastName:new_player.lastName,
      age:new_player.age,
      position:new_player.position,
      teamId:new_player.teamId
    });
  }

  deletePlayer(id:number): Observable<HttpResponse<String>>{
    return this.http.delete<HttpResponse<String>>(this.baseURL + '/players', {body:{id:id}});
  }




  getAllCoaches(): Observable<HttpResponse<Coach[]>>{
    return this.http.get<Coach[]>(this.baseURL + '/coaches', {observe:"response"});
  }

  getUnassingedCoaches(): Observable<HttpResponse<Coach[]>>{
    return this.http.get<Coach[]>(this.baseURL + '/coaches/unassigned', {observe:"response"});
  }

  updateCoach(diff_coach:Coach): Observable<HttpResponse<String>>{
    return this.http.put<HttpResponse<String>>(this.baseURL + '/coaches', {
      id:diff_coach.id,
      firstName:diff_coach.firstName,
      lastName: diff_coach.lastName,
      age:diff_coach.age,
      role:diff_coach.role,
      teamId:diff_coach.teamId
    });
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

  deleteCoach(coach:Coach): Observable<HttpResponse<String>>{
    return this.http.delete<HttpResponse<String>>(this.baseURL + '/coaches', {body:{
      id:coach.id,
      teamId:coach.teamId,
      role:coach.role
    }});
  }
}
