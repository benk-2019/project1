import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../models/player';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Team } from '../models/team';
import { TeamSimple } from '../models/team-simple';
import { TeamListService } from '../services/team-list.service';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @Input() player: Player = new Player(0, '', '', 0, '',0, '');

  teamList: TeamSimple[] = [];

  constructor(private teamListService:TeamListService, private route:Router, private playerService: PlayerService){
    this.teamListService.teamList.subscribe(data=>{
      this.teamList = data;
    })
  }

  @Output() updatePlayerEvent = new EventEmitter<Player>();
  @Output() deletePlayerEvent = new EventEmitter<void>();
  @Output() resetPlayerEvent = new EventEmitter<void>();
  updatePlayer(): void{
    console.log(this.player);
    this.updatePlayerEvent.emit(this.player);
  }

  deletePlayer(): void{
    this.deletePlayerEvent.emit();
  }

  resetPlayer(): void{
    this.resetPlayerEvent.emit();
  }

  transferPlayer(){
    this.playerService.setplayer_s(this.player);
    this.route.navigate(['players/transfer_player']);
  }
}
