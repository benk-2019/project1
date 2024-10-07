import { Component } from '@angular/core';
import { Player } from '../models/player';
import { PlayerComponent } from '../player/player.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PlayerComponent, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  players: Player[] = [
    new Player(1, 'Bad', 'Mood', 23, "Front", "Jets"),
    new Player(2, 'Cool', 'Dude', 23, "Mid", ""),
    new Player(3, 'Witha', '\'Tude', 23, "Mid", "Hawks"),
    new Player(4, 'A', 'Prude?', 23, "Rear", "Jets"),
  ]

  teamSelected: string = '';
  teamNames: string[] = [];

  teamList(){
    let teams: string[] = [];
    for(let player of this.players){
      if(teams.indexOf(player.teamName) === -1){
        teams.push(player.teamName);
      }
    }
    this.teamNames = teams;
  }
}
