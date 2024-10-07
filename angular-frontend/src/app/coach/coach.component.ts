import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coach } from '../models/coach';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.css'
})
export class CoachComponent {
  @Input() coach: Coach = new Coach(0, '', '', 0, '', '');


  //store intermediate value of coach in this variable
  constructor(){
  }

  @Output() updateCoachEvent = new EventEmitter<Coach>();
  @Output() deleteCoachEvent = new EventEmitter<void>();
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
}
