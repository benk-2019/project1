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

  @Output() updateTeamEvent = new EventEmitter<TeamCoachPlayer>();
  // @Output() deleteTeamEvent = new EventEmitter<void>();
  // @Output() resetTeamEvent = new EventEmitter<void>();
  updateTeam() : void{
    // let flag:boolean = false;

    // for(let coach of this.team.coaches){
    //   if(this.team.headCoach === (coach.firstName + " " + coach.lastName)){
    //     flag = true;
    //     break;
    //   }
    // }

    // if((flag) || (this.team.headCoach === '')){
    //   this.updateTeamEvent.emit(this.team);
    // }
    this.updateTeamEvent.emit(this.team);
  }

  // deleteTeam():void{
  //   this.deleteTeamEvent.emit();
  // }

  // resetTeam():void{//not sure how to do this, will come back later
  //   this.resetTeamEvent.emit();
  // }
}
