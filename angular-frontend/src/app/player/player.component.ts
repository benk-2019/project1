import { Component, Input } from '@angular/core';
import { Player } from '../models/player';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @Input() player: Player = new Player(0, '', '', 0, '', '');
}
