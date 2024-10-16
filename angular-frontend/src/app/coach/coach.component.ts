import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Coach } from '../models/coach';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TeamSimple } from '../models/team-simple';
import { TeamListService } from '../services/team-list.service';
import { SwapCoachComponent } from '../swap-coach/swap-coach.component';
import {Router} from '@angular/router';
import { CoachService } from '../services/coach.service';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [FormsModule, SwapCoachComponent],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.css'
})
export class CoachComponent {
  @Input() coach: Coach = new Coach(0, '', '', 0, '', 0, '');

  // coach_copy: Coach = new Coach(0, '', '', 0, '', 0, '');
  teamList: TeamSimple[] = [];

  constructor(private teamListService:TeamListService, private coachService:CoachService, private router:Router){
    this.teamListService.teamList.subscribe(data=>{//get list of available teams
      this.teamList = data;
    });
  }

  //output event notifying parent of crud operations to perform
  @Output() updateCoachEvent = new EventEmitter<Coach>();
  @Output() deleteCoachEvent = new EventEmitter<number>();
  @Output() resetCoachEvent = new EventEmitter<void>();
  updateCoach() : void{
    this.updateCoachEvent.emit(this.coach);
  }

  deleteCoach():void{
    this.deleteCoachEvent.emit();
  }

  resetCoach():void{//not sure how to do this, will come back later
    this.resetCoachEvent.emit();
  }

  //store coach to swap before navigating to new page
  transferCoach(){
    this.coachService.setCoach_s(this.coach);
    this.router.navigate(['coaches/transfer_coach']);
  }
}
