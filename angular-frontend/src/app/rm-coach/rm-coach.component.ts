import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coach } from '../models/coach';

@Component({
  selector: 'app-rm-coach',
  standalone: true,
  imports: [],
  templateUrl: './rm-coach.component.html',
  styleUrl: './rm-coach.component.css'
})
export class RmCoachComponent {
  @Input() coach:Coach = new Coach(0,'','',0,'', 0, '');
  
  @Output() rmCoachEvent = new EventEmitter<void>();
  
  rmCoach(){
    this.rmCoachEvent.emit();
  }
}
