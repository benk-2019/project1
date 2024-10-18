import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { HttpService } from '../services/http.service';
import { TeamListService } from '../services/team-list.service';
import { TeamSimple } from '../models/team-simple';
import { Team } from '../models/team';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { FormsModule } from '@angular/forms';
import { CoachService } from '../services/coach.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swap-coach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './swap-coach.component.html',
  styleUrl: './swap-coach.component.css'
})
export class SwapCoachComponent {
  coach1: Coach = new Coach(0, '', '', 0, '', 0, '');
  teamList: TeamSimple[] = [];
  selectedTeam: TeamSimple = new TeamSimple(0, '');
  oldTeam: TeamCoachPlayer = new TeamCoachPlayer(0,'',0,'',[],[]);
  newTeam: TeamCoachPlayer = new TeamCoachPlayer(0,'',0,'',[],[]);

  constructor(private httpService:HttpService, private teamListService:TeamListService, private coachService:CoachService, private router:Router){
    this.teamListService.teamList.subscribe(data=>{//get list of teams
      this.teamList = data;
      console.log(data);
    });
    this.coachService.coach_s.subscribe(data=>{//get coach we are swapping
      this.coach1 = data;
    });
  }

  changeTeam(){
    this.coach1.teamId = this.selectedTeam.id;
    this.coach1.teamname = this.selectedTeam.teamName;
    //force role to head if no head on this team
    //force role to empty if no team selected
    //force assistant role if already have head
    if(this.newTeam.headCoach && this.newTeam.teamName){
      this.coach1.role = 'Assistant';
    }
    else if(this.newTeam.teamName){
      this.coach1.role = 'Head';
    }
    else{
      this.coach1.role = '';
    }
    this.httpService.updateCoach(this.coach1).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/coaches']);
    });
  }

  getNewTeam(){
    for(let team of this.teamList){//find team id in team list
      if(this.selectedTeam.teamName === team.teamName){
        this.selectedTeam.id = team.id;
        break;
      }
    }
    this.httpService.getTeamById(this.selectedTeam.id).subscribe(data=>{
      console.log(data.body);
      this.newTeam = (data.body)?data.body:(new TeamCoachPlayer(0,'',0,'',[],[]));
    });
  }
}
