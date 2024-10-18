import { Component } from '@angular/core';
import { Player } from '../models/player';
import { PlayerComponent } from '../player/player.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { RouterLink } from '@angular/router';
import { TeamSimple } from '../models/team-simple';
import { TeamListService } from '../services/team-list.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PlayerComponent, FormsModule, RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  players: Player[] = [];

  teamSelected: string = '';
  teamNames: string[] = [];
  updateError1 = false;
  updateError2 = false;

  constructor(private httpService: HttpService){
    this.getAllPlayers();
  }

  getAllPlayers(){
    this.httpService.getAllPlayers().subscribe(data=>{
      let temp_players: Player[] = [];
      temp_players = (data.body)?data.body:[];//either have body or empty list
      console.log(data.body);
      this.players = temp_players;
      console.log(this.players);
      this.teamList();
    });
  };

  teamList(){//get teams that players are assigned to, no reason to give user option to look at empty team roster
    let teams: string[] = [];
    for(let player of this.players){
      if((teams.indexOf(player.teamname) === -1) && player.teamname){
        teams.push(player.teamname);
      }
    }
    this.teamNames = teams;
  }

  //handle errors for incorrect update, otherwise just log result of update
  updatePlayer(index:number, player:Player){
    this.updateError1 = false;
    this.updateError2 = false;
    let new_player = player;
    this.httpService.updatePlayer(new_player).subscribe(data=>{
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

  deletePlayer(index:number){
    this.httpService.deletePlayer(this.players[index].id).subscribe(data=>{
      console.log(data);
    });
    let temp_players: Player[] = [];
    for(let i = 0; i<this.players.length; i++){//can avoid get here by just removing player from local array
      if(i !== index){
        temp_players.push(this.players[i]);
      }
    }
    this.players = temp_players;
  }

  resetPlayer(){//just reset values for players to reset page, also error flags
    this.getAllPlayers();
    this.updateError1 = false;
    this.updateError2 = false;
  }
}
