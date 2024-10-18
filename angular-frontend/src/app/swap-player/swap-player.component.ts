import { Component } from '@angular/core';
import { Player } from '../models/player';
import { TeamSimple } from '../models/team-simple';
import { HttpService } from '../services/http.service';
import { TeamListService } from '../services/team-list.service';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-swap-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './swap-player.component.html',
  styleUrl: './swap-player.component.css'
})
export class SwapPlayerComponent {
  player: Player = new Player(0, '', '', 0, '', 0, '');
  teamList: TeamSimple[] = [];
  selectedTeam: TeamSimple = new TeamSimple(0, '');
  oldTeam: TeamCoachPlayer = new TeamCoachPlayer(0,'',0,'',[],[]);
  newTeam: TeamCoachPlayer = new TeamCoachPlayer(0,'',0,'',[],[]);

  constructor(private httpService:HttpService, private teamListService:TeamListService, private playerService:PlayerService, private router:Router){
    this.teamListService.teamList.subscribe(data=>{//get list of teams
      this.teamList = data;
    });
    this.playerService.player_s.subscribe(data=>{//get the player we are planning to swap
      this.player = data;
    });
  }

  changeTeam(){//set up player with variables we hid from user to enable funtionalities
    this.player.teamId = this.selectedTeam.id;
    this.player.teamname = this.selectedTeam.teamName;
    this.httpService.updatePlayer(this.player).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/players']);
    });
  }

  getNewTeam(){
    if(this.selectedTeam.teamName !== ''){//if team name empty then no team selected
      for(let team of this.teamList){//find id in teamList, so we can use it later
        if(this.selectedTeam.teamName === team.teamName){
          this.selectedTeam.id = team.id;
          break;
        }
      }
      this.httpService.getTeamById(this.selectedTeam.id).subscribe(data=>{//if we get result set it, else don't have team
        this.newTeam = (data.body)?data.body:(new TeamCoachPlayer(0,'',0,'',[],[]));
      });
    }
    else{
      this.selectedTeam.id = 0;
      this.newTeam = new TeamCoachPlayer(0,'',0,'',[],[]);
    }
    console.log(this.selectedTeam.id);
  }
}
