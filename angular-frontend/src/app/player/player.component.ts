import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../models/player';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @Input() player: Player = new Player(0, '', '', 0, '',0, '');


  @Output() updatePlayerEvent = new EventEmitter<Player>();
  updatePlayer(): void{
    console.log(this.player);
    this.updatePlayerEvent.emit(this.player);
  }
}
