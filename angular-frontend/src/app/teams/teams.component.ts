import { Component } from '@angular/core';
import { Team } from '../models/team';
import { TeamComponent } from '../team/team.component';
import { HttpService } from '../services/http.service';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { RouterLink } from '@angular/router';
import { TeamListService } from '../services/team-list.service';
import { TeamSimple } from '../models/team-simple';

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
  constructor(private httpService: HttpService, private teamListService:TeamListService){
    this.getAllTeams();
  }

  teams: TeamCoachPlayer[] = [];
  teamList: TeamSimple[] = [];

  getAllTeams(){
    this.httpService.getAllTeams().subscribe(data=>{
      let temp_team: TeamCoachPlayer[] = [];
      temp_team = (data.body)?data.body:[];
      this.teams = temp_team;
      console.log(this.teams);
      this.setTeamList();
    })
  };

  updateTeam(index:number, team:TeamCoachPlayer){
    this.httpService.updateTeam(team).subscribe(data=>{
      console.log(data);
    });
    // this.getAllTeams();
    console.log(this.teams);
  };

  setTeamList(){
    let temp_tList: TeamSimple[] = []
    for(let team of this.teams){
      if(temp_tList.indexOf({id:team.id,teamName:team.teamName}) === -1){//not sure this is necessary anymore
        temp_tList.push({id:team.id,teamName:team.teamName});
      }
    }
    console.log(temp_tList);
    this.teamListService.setTeamList(temp_tList);
  }

  resetTeam(){
    this.getAllTeams();
  }

  deleteTeam(index:number){
    let team:TeamCoachPlayer = this.teams[index];
    let temp_team:TeamCoachPlayer[] = [];
    for(let i=0; i<this.teams.length; i++){
      if(i !== index){
        temp_team.push(this.teams[i]);
      }
    }
    this.teams = temp_team;
    this.setTeamList();
    this.httpService.deleteTeam(team.id).subscribe(data=>{
      console.log(data);
    }); 
  }
}
