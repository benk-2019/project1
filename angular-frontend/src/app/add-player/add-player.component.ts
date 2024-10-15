import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../models/player';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {
  @Input() player:Player = new Player(0,'','',0,'', 0, '');
  
  @Output() addPlayerEvent = new EventEmitter<void>();
  
  addPlayer(){
    this.addPlayerEvent.emit();
  }
}
