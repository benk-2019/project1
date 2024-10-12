import { Component } from '@angular/core';
import { Player } from '../models/player';
import { PlayerComponent } from '../player/player.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { RouterLink } from '@angular/router';

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

  constructor(private httpService: HttpService){
    this.getAllTeamsPlayers();
  }

  teamList(){
    let teams: string[] = [];
    for(let player of this.players){
      if((teams.indexOf(player.teamname) === -1)){
        teams.push(player.teamname);
      }
    }
    this.teamNames = teams;
  };

  getAllTeamsPlayers(){
    this.httpService.getAllPlayers().subscribe(data=>{
      let temp_players: Player[] = [];
      temp_players = (data.body)?data.body:[];
      this.players = temp_players;
      console.log(this.players);
      this.teamList();
    });
  };

  updatePlayer(index:number, player:Player){
    let new_player = player;
    this.httpService.updatePlayer(new_player).subscribe(data=>{
      console.log(data);
    });
    // this.getAllTeamsPlayers();
  };
}
