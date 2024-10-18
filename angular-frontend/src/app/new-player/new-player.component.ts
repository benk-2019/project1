import { Component } from '@angular/core';
import { Player } from '../models/player';
import { TeamListService } from '../services/team-list.service';
import { TeamSimple } from '../models/team-simple';
import { HttpService } from '../services/http.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.css'
})
export class NewPlayerComponent {
  player: Player = new Player(0,'', '', 0, '', 0, '');
  teamList: TeamSimple[] = [];
  errorCreate:boolean = false;

  //probs want subscribe to team list for available list of teams to add player to
  constructor(private teamListService: TeamListService, private httpService: HttpService, private router: Router){
    this.teamListService.teamList.subscribe(data=>{
      this.teamList = data;
    });
  }

  createPlayer(){//find team id, then create player in backend, hanlde error if player with same name already exists
    this.errorCreate = false;
    for(let team of this.teamList){
      if(team.teamName === this.player.teamname){
        this.player.teamId = team.id;
        break;
      }
    }
    this.httpService.createPlayer(this.player).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/players']);
    }, error=>{
      console.error(error);
      if(error.status === 400){
        this.errorCreate = true;
      }
    })
  }

  resetPage(){//just need to reset player and error flags
    this.player = new Player(0,'', '', 0, '', 0, '');
    this.errorCreate = false;
  }
}
