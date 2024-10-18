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
  updateError1 = false;
  updateError2 = false;

  constructor(private httpService: HttpService, private teamListService:TeamListService){
    this.getAllTeams();
  }

  teams: TeamCoachPlayer[] = [];
  teamList: TeamSimple[] = [];

  getAllTeams(){
    this.httpService.getAllTeams().subscribe(data=>{
      let temp_team: TeamCoachPlayer[] = [];
      temp_team = (data.body)?data.body:[];//if have data body then set teams else empty
      this.teams = temp_team;
      console.log(this.teams);
      this.setTeamList();//make sure to make the list of team names and id's globally accessible
    })
  };

  //update team, handle errors accordingly
  updateTeam(index:number, team:TeamCoachPlayer){
    this.updateError1 = false;
    this.updateError2 = false;
    this.httpService.updateTeam(team).subscribe(data=>{
      console.log(data);
    }, error=>{
      console.error(error);
      if(error.status === 404){//not found in db
        this.updateError1 = true;
      }
      else if(error.status === 400){//name already exist in db
        this.updateError2 = true;
      }
    });
  };

  setTeamList(){
    let temp_tList: TeamSimple[] = []
    for(let team of this.teams){
      //at this point this dont think this is unnecessary, shouldn't be able to have duplicate teams
      //will keep it in though, too late to risk code functionality 
      if(temp_tList.indexOf({id:team.id,teamName:team.teamName}) === -1){
        temp_tList.push({id:team.id,teamName:team.teamName});
      }
    }
    console.log(temp_tList);
    this.teamListService.setTeamList(temp_tList);//use serivce to make team list globally accessible
  }

  resetTeam(){
    this.getAllTeams();//can reset by just calling getAllTeams again
  }

  deleteTeam(index:number){
    let team:TeamCoachPlayer = this.teams[index];
    let temp_team:TeamCoachPlayer[] = [];

    //remove team from local array to avoid having to make a get call
    for(let i=0; i<this.teams.length; i++){
      if(i !== index){
        temp_team.push(this.teams[i]);
      }
    }
    this.teams = temp_team;
    this.setTeamList();//set globally accessible list of teams

    
    this.httpService.deleteTeam(team.id).subscribe(data=>{
      console.log(data);
    }); 
  }
}
