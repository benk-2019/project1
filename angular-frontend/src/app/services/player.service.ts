import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { BehaviorSubject } from 'rxjs';

//We want access to player we want to swap after changing pages, so store here
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerSubject = new BehaviorSubject<Player>(new Player(0, '', '', 0, '', 0, ''));

  player_s = this.playerSubject.asObservable();

  constructor() { }

  setplayer_s(player_serve:Player){
    this.playerSubject.next(player_serve);
  }
}
