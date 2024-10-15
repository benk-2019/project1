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
  teamList: TeamSimple[] = [];

  constructor(private httpService: HttpService, private teamListService: TeamListService){
    this.getAllPlayers();
    console.log("In Players Constructor!!!");
    this.teamListService.teamList.subscribe(data=>{
      this.teamList = data;
    });
  }

  getAllPlayers(){
    this.httpService.getAllPlayers().subscribe(data=>{
      let temp_players: Player[] = [];
      temp_players = (data.body)?data.body:[];
      console.log(data.body);
      this.players = temp_players;
      console.log(this.players);
    });
  };

  updatePlayer(index:number, player:Player){
    let new_player = player;
    this.httpService.updatePlayer(new_player).subscribe(data=>{
      console.log(data);
    });
  };

  deletePlayer(index:number){
    this.httpService.deletePlayer(this.players[index].id).subscribe(data=>{
      console.log(data);
    });
    let temp_players: Player[] = [];
    for(let i = 0; i<this.players.length; i++){
      if(i !== index){
        temp_players.push(this.players[i]);
      }
    }
    this.players = temp_players;
  }

  resetPlayer(){
    this.getAllPlayers();
  }
}
