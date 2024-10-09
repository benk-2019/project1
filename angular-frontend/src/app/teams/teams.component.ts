import { Component } from '@angular/core';
import { Team } from '../models/team';
import { TeamComponent } from '../team/team.component';
import { HttpService } from '../services/http.service';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TeamComponent, RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  // teams: Team[] = [
  //   new Team(1, 'Hawks', 0, '', [],["Not Player Coach"]),
  //   new Team(2, 'Badgers', 0, '', [],[]),
  //   new Team(3, 'Bulldogs', 0, '', [],[])
  // ]
  constructor(private httpService: HttpService){
    this.getAllTeams();
  }

  teams: TeamCoachPlayer[] = [];

  getAllTeams(){
    this.httpService.getAllTeams().subscribe(data=>{
      let temp_team: TeamCoachPlayer[] = [];
      temp_team = (data.body)?data.body:[];
      this.teams = temp_team;
      console.log(this.teams);
    })
  };

  updateTeam(index:number, team:TeamCoachPlayer){
    this.teams[index] = team;
  }
}
