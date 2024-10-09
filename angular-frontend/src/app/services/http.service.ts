import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { TeamCoachPlayer } from '../models/team-coach-player';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  baseURL: string = "http://localhost:3031";

  getAllTeams(): Observable<HttpResponse<TeamCoachPlayer[]>>{
    return this.http.get<TeamCoachPlayer[]>(this.baseURL + '/teams', {observe: "response"});
  }
}
