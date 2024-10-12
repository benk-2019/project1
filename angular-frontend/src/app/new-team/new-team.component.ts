import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Team } from '../models/team';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { Player } from '../models/player';
import { HttpService } from '../services/http.service';
import { Coach } from '../models/coach';

@Component({
  selector: 'app-new-team',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-team.component.html',
  styleUrl: './new-team.component.css'
})
export class NewTeamComponent {
  team : Team = new Team(0,'', 0, '', [], []);
  unassignedPlayers: Player[] = [];
  unassignedCoaches: Coach[] = [];

  constructor(private httpService: HttpService){
    this.getUnassignedPlayers();
    this.getUnassignedCoaches();
  }

  getUnassignedPlayers(){

  }

  getUnassignedCoaches(){
    this.httpService.getUnassingedPlayers().subscribe(data=>{
      this.unassignedPlayers = (data.body)?data.body:[];
    })
  }
}
