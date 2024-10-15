import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../models/player';

@Component({
  selector: 'app-rm-player',
  standalone: true,
  imports: [],
  templateUrl: './rm-player.component.html',
  styleUrl: './rm-player.component.css'
})
export class RmPlayerComponent {
  @Input() player:Player = new Player(0,'','',0,'', 0, '');
  
  @Output() rmPlayerEvent = new EventEmitter<void>();
  
  rmPlayer(){
    this.rmPlayerEvent.emit();
  }
}
