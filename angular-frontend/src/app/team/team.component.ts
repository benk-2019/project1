import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../models/team';
import { FormsModule } from '@angular/forms';
import { TeamCoachPlayer } from '../models/team-coach-player';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  @Input() team: TeamCoachPlayer = new TeamCoachPlayer(0, '', 0, '', [], []);


  //store intermediate value of team in this variable
  constructor(){
  }

  //emit events to notify parent to perform crud operations
  @Output() updateTeamEvent = new EventEmitter<TeamCoachPlayer>();
  @Output() deleteTeamEvent = new EventEmitter<void>();
  @Output() resetTeamEvent = new EventEmitter<void>();
  updateTeam() : void{
    this.updateTeamEvent.emit(this.team);
  }

  deleteTeam():void{
    this.deleteTeamEvent.emit();
  }

  resetTeam():void{
    this.resetTeamEvent.emit();
  }
}
